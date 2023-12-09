import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../../../hooks/UseAxiosSecure";
import UseAxiosPublic from "../../../../../hooks/UseAxiosPublic";
import UseAllBlogs from "../../../../../hooks/UseAllBlogs";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateBlog = () => {
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const [allBlogs] = UseAllBlogs();
  const singleBlogsInfo = allBlogs.find((singleBlog) => singleBlog._id === id);

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

    const title = data.title;
    const content = data.content;
    const image = res.data.data.display_url;
    const status = singleBlogsInfo?.status;

    if (res.data.success) {
      // creat user entry in the database:
      const updateAdminBlogInfo = {
        title,
        content,
        image,
        status,
      };
      console.log(updateAdminBlogInfo);
      const meniRes = await axiosSecure.put(
        `/dashboard/adminAddBlog/${singleBlogsInfo?._id}`,
        updateAdminBlogInfo
      );
      console.log(meniRes.data);
      if (meniRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "updated Blog Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>
          Global Blood Fund | Dashboard | Content Management | Add Blog
        </title>
      </Helmet>
      <div className="my-5">
        <h1 className="text-5xl text-center font-bold">
          <span className="text-rose-400">Update</span> Blog!
        </h1>
        <div className="hero mt-14">
          <div className="card md:w-1/2 w-full max-w-xl shadow-2xl bg-cyan-500 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title*</span>
                </label>
                <input
                  type="text"
                  defaultValue={singleBlogsInfo?.title}
                  placeholder="title"
                  {...register("title", { required: true })}
                  className="input input-bordered"
                />
                {errors.title && (
                  <span className="text-red-500">title field is required</span>
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
                  <span className="label-text">Content*</span>
                </label>
                <input
                  type="text"
                  defaultValue={singleBlogsInfo?.content}
                  placeholder="content"
                  {...register("content", { required: true })}
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
                  value="Update Blog"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
