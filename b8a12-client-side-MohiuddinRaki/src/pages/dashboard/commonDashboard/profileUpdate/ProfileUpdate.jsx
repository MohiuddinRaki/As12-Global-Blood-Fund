import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import UseAxiosPublic from "../../../../hooks/UseAxiosPublic";
import UseAuth from "../../../../hooks/UseAuth";
import UseUserInfo from "../../../../hooks/UseUserInfo";
import UseDistrict from "../../../../hooks/UseDistrict";
import UseUpazila from "../../../../hooks/UseUpazila";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfileUpdate = () => {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const [userInfo] = UseUserInfo();
  const singleUserInfo = userInfo.find(
    (singleUser) => singleUser.email === user.email
  );
  const [donatorDistrict] = UseDistrict();
  const [donatorUpazila] = UseUpazila();
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
    const district = data.district;
    const upazila = data.upazila;
    const blodGroup = data.blodGroup;
    const image = res.data.data.display_url;
    if (res.data.success) {
      // now send the menu item data to the server with image url:
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
      const meniRes = await axiosPublic.put(
        `/dashboard/donationUsers/${singleUserInfo?._id}`,
        userInfo
      );
      console.log(meniRes.data);
      if (meniRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `${data.name} updated Your user Info Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Global Blood Fund | Dashboard | Donor Update</title>
      </Helmet>
      <div>
         <div className="card md:w-1/2 w-full max-w-xl shadow-2xl bg-base-100 pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                placeholder="name"
                defaultValue={singleUserInfo?.name}
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
                readOnly
                defaultValue={singleUserInfo?.email}
                {...register("email")}
                name="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500">email is required</span>
              )}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">District*</span>
              </label>
              <select
                defaultValue={singleUserInfo?.district}
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
                defaultValue={singleUserInfo?.upazila}
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
          <div className="flex gap-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Blood Group*</span>
              </label>
              <select
                defaultValue={singleUserInfo?.blodGroup}
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
            <div className="w-1/2">
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
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Update" />
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
