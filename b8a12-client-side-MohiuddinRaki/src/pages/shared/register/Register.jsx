import { useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import Swal from "sweetalert2";
// import SocialLogin from "../socialLogin/SocialLogin";
import UseDistrict from "../../../hooks/UseDistrict";
import UseUpazila from "../../../hooks/UseUpazila";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = UseAxiosPublic();
  const [donatorDistrict] = UseDistrict();
  const [donatorUpazila] = UseUpazila();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const { createUser, handleUpdateProfile } = UseAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const name = data.name;
    const email = data.email;
    const district = data.district;
    const upazila = data.upazila;
    const blodGroup = data.blodGroup;
    const image = res.data.data.display_url;

    if (res.data.success) {
      createUser(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        handleUpdateProfile(data.name, res.data.data.display_url)
          .then(() => {
            // creat user entry in the database:
            const userInfo = {
              name,
              email,
              district,
              upazila,
              blodGroup,
              image,
              role: "donor",
              status: "active",
            };
            console.log(userInfo);
            axiosPublic.post("/donationUsers", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "user added successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
            navigate("/");
          })
          .catch((error) => console.log(error));
      });
    }
  };

  // console.log(watch("example"))

  return (
    <>
      <Helmet>
        <title>Global Blood Fund || register</title>
      </Helmet>
      <div className="pt-16">
        <h1 className="text-5xl text-center font-bold">Sign Up Now!</h1>
        <div className="hero mt-14">
          {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
          {/* <div className="md:w-1/2 w-full max-w-xl">
         <img src="https://i.ibb.co/YW2kYcG/istockphoto-1349428314-640x640.jpg" alt="" />
          </div> */}
          <div className="card md:w-1/2 w-full max-w-xl shadow-2xl bg-base-100 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Name*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    name="name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-500">name field is required</span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                    name="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-500">email is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">District*</span>
                  </label>
                  <select
                    defaultValue="default"
                    {...register("district", { required: true })}
                    className="select select-bordered"
                  >
                    <option disabled value="default">
                      select a district
                    </option>
                    {donatorDistrict.map((district) => (
                      <option key={district._id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text"> Upazila*</span>
                  </label>
                  <select
                    defaultValue="default"
                    {...register("upazila", { required: true })}
                    className="select select-bordered"
                  >
                    <option disabled value="default">
                      select a upazila
                    </option>
                    {donatorUpazila.map((upazila) => (
                      <option key={upazila._id} value={upazila.name}>
                        {upazila.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="form-control w-1/3">
                  <label className="label">
                    <span className="label-text">Blood Group*</span>
                  </label>
                  <select
                    defaultValue="default"
                    {...register("blodGroup", { required: true })}
                    className="select select-bordered"
                  >
                    <option disabled value="default">
                      select a blood group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="w-2/3">
                  <label className="label">
                    <span className="label-text">Photo*</span>
                  </label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                    })}
                    name="password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-500">password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500">
                      password must be 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500">
                      password not more than 20 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500">
                      password must have one number,uppercase,lowercase and
                      special characters
                    </span>
                  )}
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: true,
                      validate: {
                        matchesPassword: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      },
                    })}
                    className="input input-bordered"
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500">
                      Confirm Password is required
                    </span>
                  )}
                  {errors.confirmPassword?.type === "matchesPassword" && (
                    <span className="text-red-500">
                      Password and Confirm Password dont match
                    </span>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="SignUp"
                />
              </div>
            </form>
            {/* <p>
              <small className="px-6">
                Alreday have an accoint? <Link to="/login">Please Login</Link>
              </small>
            </p>
            <h2 className="p-6">
              <SocialLogin></SocialLogin>
            </h2> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
