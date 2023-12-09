import { Helmet } from "react-helmet-async";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
import UseAuth from "../hooks/UseAuth";
import UseUserInfo from "../hooks/UseUserInfo";
import useAdmin from "../hooks/useAdmin";
import UseVolunteer from "../hooks/UseVolunteer";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  const [isVolunteer] = UseVolunteer();
  const { user, logOutUser } = UseAuth();
  const [userInfo] = UseUserInfo();
  const blockUser = userInfo.find((blckUser) => blckUser.email === user.email);

  return (
    <>
      <Helmet>
        <title>Global Blood Fund || Dashboard</title>
      </Helmet>
      <div className="container mx-auto">
        {isAdmin ? (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="min-h-full bg-[#701c45] rounded-2xl">
                <ul className="menu p-4">
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/profile">
                      {/* <FaHome></FaHome> */}
                      Profile
                    </NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/allUsers">
                      {/* <FaHistory></FaHistory> */}
                      All Users
                    </NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/all-blood-donation-request">
                      {/* <FaAd></FaAd> */}
                      All Donation Request
                    </NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/content-management">
                      {/* <FaAd></FaAd> */}
                      Content Management
                    </NavLink>
                  </li>
                  {/* shared navlinks */}
                  <div className="divider"></div>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/">
                      {/* <FaHome></FaHome> */}
                      Home
                    </NavLink>
                  </li>
                  {/* <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                  <NavLink to="/dashboard/contact">
                    Contact
                  </NavLink>
                </li> */}
                  <li>
                    <Link to="/">
                      <button
                        className="btn btn-sm btn-ghost text-[#ed1b2f] mt-3 font-medium text-xl"
                        onClick={logOutUser}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1 p-8">
                <Outlet></Outlet>
              </div>
            </div>
          </>
        ) : isVolunteer ? (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="min-h-full bg-[#701c45] rounded-2xl">
                <ul className="menu p-4">
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/profile">
                      {/* <FaHome></FaHome> */}
                      Profile
                    </NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/all-blood-donation-request">
                      {/* <FaHistory></FaHistory> */}
                      All donation Request
                    </NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/content-management">
                      {/* <FaAd></FaAd> */}
                      Content Management
                    </NavLink>
                  </li>

                  {/* shared navlinks */}
                  <div className="divider"></div>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/">
                      {/* <FaHome></FaHome> */}
                      Home
                    </NavLink>
                  </li>
                  {/* <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                  <NavLink to="/dashboard/contact">
                    Contact
                  </NavLink>
                </li> */}
                  <li>
                    <Link to="/">
                      <button
                        className="btn btn-sm text-[#ed1b2f] mt-3 font-medium text-xl btn-ghost"
                        onClick={logOutUser}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1 p-8">
                <Outlet></Outlet>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="min-h-full bg-[#701c45] rounded-2xl">
                <ul className="menu p-4">
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/profile">
                      {/* <FaHome></FaHome> */}
                      Profile
                    </NavLink>
                  </li>
                  {blockUser?.status === "active" && (
                    <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                      <NavLink to="/dashboard/create-donation-request">
                        {/* <FaHistory></FaHistory> */}
                        Create Request
                      </NavLink>
                    </li>
                  )}
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/dashboard/myRequest">
                      {/* <FaAd></FaAd> */}
                      My Request
                    </NavLink>
                  </li>

                  {/* shared navlinks */}
                  <div className="divider"></div>
                  <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                    <NavLink to="/">
                      {/* <FaHome></FaHome> */}
                      Home
                    </NavLink>
                  </li>
                  {/* <li className="text-[#ed1b2f] mt-3 font-medium text-xl">
                  <NavLink to="/dashboard/contact">
                    Contact
                  </NavLink>
                </li> */}
                  <li>
                    <Link to="/">
                      <button
                        className="btn btn-sm text-[#ed1b2f] mt-3 font-medium text-xl btn-ghost"
                        onClick={logOutUser}
                      >
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1 p-8">
                <Outlet></Outlet>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
