import { FaDollarSign, FaList, FaUsers } from "react-icons/fa";
import UseUserInfo from "../../../../hooks/UseUserInfo";
import UseDonorRequest from "../../../../hooks/UseDonorRequest";
import UseAuth from "../../../../hooks/UseAuth";
const DashboardWelcome = () => {
  const { user } = UseAuth();
  const [userInfo] = UseUserInfo();
  const [createRequest] = UseDonorRequest();
  return (
    <div className="space-y-8">
      <h2 className="text-center">
        <span className="text-4xl font-medium">
          <span className="text-red-500">Wecome</span> Back!,{" "}
          <span className="text-green-500">{user?.displayName}</span>
        </span>
      </h2>
      <div className="card max-w-xl bg-base-300 shadow-xl">
        <div className="card-body">
          <p className="flex items-center gap-10 text-4xl font-bold text-green-500">
            <FaUsers></FaUsers>
            <span className="text-amber-500">
              Total Users: {userInfo.length}
            </span>
          </p>
          <p></p>
        </div>
      </div>
      <div className="card max-w-xl bg-base-300 shadow-xl">
        <div className="card-body">
          <p className="flex items-center gap-10 text-4xl font-bold text-green-500">
            <FaDollarSign></FaDollarSign>
            <span className="text-amber-500">Total Funding: </span>
          </p>
          <p></p>
        </div>
      </div>
      <div className="card max-w-xl bg-base-300 shadow-xl">
        <div className="card-body">
          <p className="flex items-center gap-10 text-3xl font-bold text-green-500">
            <FaList></FaList>
            <span className="text-amber-500">
              Total Donation Request: {createRequest.length}
            </span>
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
