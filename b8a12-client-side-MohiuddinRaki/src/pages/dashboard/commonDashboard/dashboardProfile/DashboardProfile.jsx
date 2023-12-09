import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import UseAuth from "../../../../hooks/UseAuth";
import UseUserInfo from "../../../../hooks/UseUserInfo";

const DashboardProfile = () => {
  const { user } = UseAuth();
  const [userInfo] = UseUserInfo();
  const singleUserInfo = userInfo.find(
    (singleUser) => singleUser.email === user.email
  );

  console.log(userInfo);
  return (
    <>
      <Helmet>
        <title>Global Blood Fund | Dashboard | Profile</title>
      </Helmet>
      <div>
        <div className="bg-[#701c45] flex flex-col md:flex-row gap-6">
          <div>
            <img src={singleUserInfo?.image} alt="" />
          </div>
          <div className="items-center mt-10 space-y-4">
            <h1 className="text-red-500 font-medium text-xl border-b-4">
              <span className="text-white">Name:</span> {singleUserInfo?.name}
            </h1>
            <h1 className="text-red-500 font-medium text-xl border-b-4">
              <span className="text-white">Email:</span>
              {singleUserInfo?.email}
            </h1>
            <h1 className="text-red-500 font-medium text-xl border-b-4">
              <span className="text-white">Blod Group:</span>
              {singleUserInfo?.blodGroup}
            </h1>
            <h1 className="text-red-500 font-medium text-xl border-b-4">
              <span className="text-white">Upazila:</span>
              {singleUserInfo?.upazila}
            </h1>
            <h1 className="text-red-500 font-medium text-xl border-b-4">
              <span className="text-white">District:</span>
              {singleUserInfo?.district}
            </h1>
            <Link to={`/dashboard/donationUsers/${singleUserInfo?._id}`}>
              <button className="w-full btn btn-success mt-5">Update</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
