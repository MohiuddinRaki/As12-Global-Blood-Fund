import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import { motion } from "framer-motion";
import UseFeedBack from "../../../hooks/UseFeedBack";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAdmin from "../../../hooks/useAdmin";

const PeopleFeedBack = () => {
  const { user } = UseAuth();
  const [isAdmin] = useAdmin();
  const [allFeedbacks, refetch] = UseFeedBack();
  const axiosSecure = UseAxiosSecure();
  const handleAddFeedBack = (event) => {
    event.preventDefault();
    const form = event.target;
    const feedBack = form.feedBack.value;
    const userEmail = user?.email;
    const userName = user?.displayName;
    const userPhoto = user?.photoURL;
    const dateTime = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    const currentTime = dateTime.toLocaleString("en-Us", options);

    const newUserFeedBacks = {
      feedBack,
      userEmail,
      userName,
      userPhoto,
      currentTime,
    };
    console.log(newUserFeedBacks);

    //  send data to the server:
    fetch("https://b8a12-server-side-mohiuddin-raki.vercel.app/userFeedBacks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUserFeedBacks),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "Thank Yoy For Your FeedBack",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        event.target.reset();
      });
  };
  const handleNoAccessDelete = () => {
    refetch();
    Swal.fire({
      text: "No Access For Delete",
      icon: "warning",
    });
  };

  const handleDeleteBlog = (blog) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/userFeedBacks/${blog._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "blog has been deleted.",
            icon: "success",
          });
        }
        console.log(res.data);
      }
    });
  };
  return (
    <div className="pb-16 pt-10">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-5xl font-bold text-lime-500 text-center mb-10">
          Peoples Feedback
        </h1>

        <div className="max-w-5xl mx-auto">
          <div className=" p-8 md:p-16 lg:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
            {allFeedbacks?.map((feedBack) => (
              <motion.div
                key={feedBack._id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1 }}
                className="card card-compact bg-base-100  shadow-xl p-10"
              >
                <figure>
                  <h1 className="text-lg">{feedBack.feedBack}</h1>
                </figure>

                <div className="card-body flex-row">
                  <img
                    className="rounded-full h-12 w-12"
                    src={feedBack.userPhoto}
                    alt={feedBack.userName}
                  />
                  <h2 className="card-title text-red-400 text-base">
                    {feedBack.userName}
                  </h2>
                </div>
                {isAdmin || user?.email === feedBack?.userEmail ? (
                  <button
                    onClick={() => handleDeleteBlog(feedBack)}
                    className="btn btn-warning"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={handleNoAccessDelete}
                    className="btn btn-warning"
                  >
                    Delete
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          <form onSubmit={handleAddFeedBack}>
            {user?.email ? (
              <div>
                <div className="text-center">
                  <textarea
                    className="bg-base-300 px-5 py-3 rounded-full w-full"
                    type="text"
                    rows="1"
                    cols="80"
                    name="feedBack"
                    required
                    placeholder="Write Your FeedBack"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  value="Post"
                  className="btn btn-block bg-lime-500"
                />
              </div>
            ) : (
              " "
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PeopleFeedBack;
