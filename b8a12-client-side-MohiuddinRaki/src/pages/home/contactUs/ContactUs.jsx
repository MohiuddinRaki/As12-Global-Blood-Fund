import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ContactUs = () => {
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const name = data.name;
    const email = data.email;
    const message = data.message;
    const image = res.data.data.display_url;

    if (res.data.success) {
      // creat user entry in the database:
      const blogsContentInfo = {
        name,
        email,
        image,
        message,
      };
      console.log(blogsContentInfo);
      axiosSecure.post("/contactUs", blogsContentInfo).then((res) => {
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Thank You For Contact Us",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1 }}
        data-aos="fade-right"
      >
        <h1 className="text-5xl text-center font-bold pt-10">
          <span className="text-rose-400">Contact</span> Us!
        </h1>

        <div className="mt-10">
          <h1 className="text-5xl text-center font-bold">
            <span className="text-lime-500">Phone: </span> 01726224244
          </h1>
          <div className="hero">
            <div className="card md:w-1/2 w-full max-w-xl shadow-2xl bg-cyan-500 my-14">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Name*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Write Your Name"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.title && (
                    <span className="text-red-500">name field is required</span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Write Your Email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.title && (
                    <span className="text-red-500">
                      title field is required
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="label">
                    <span className="label-text">Photo*</span>
                  </label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input"
                  />
                  {errors.image && (
                    <span className="text-red-500">image is required</span>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Message*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Write Message"
                    {...register("message", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.content && (
                    <span className="text-red-500">content is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactUs;
