import { Link, NavLink } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";
import "./navbar.css";

const Navbar = () => {
  const { user, logOutUser } = UseAuth();

  const navLinks = (
    <>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/donationRequest">D.Request</NavLink>
      </li>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/donationBlogs">D.Blogs</NavLink>
      </li>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/funding">Fund</NavLink>
      </li>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="text-lg font-medium text-teal-500 lg:text-[#ed1b2f]">
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-[#701c45]">
      <div className="container mx-auto navbar pt-5">
        <div className="navbar-start">
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="items-center mr-2">
                <img
                  className="rounded-full max-w-16 h-10"
                  src="https://i.ibb.co/VH4RCT0/Document.jpg"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu bg-slate-900 menu-sm dropdown-content mt-3 z-[1] p-2 rounded-box w-52 lg:hidden"
            >
              {navLinks}
            </ul>
          </div>

          <Link
            to="/"
            className="btn btn-ghost normal-case text-white font-bold text-lg md:text-4xl pl-16 md:pl-44 lg:pl-0"
          >
            G.Blood Fund
          </Link>
        </div>
        <div className="mr-5 xl:navbar-center hidden lg:flex">
          <ul className="menu-horizontal gap-5">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button className="btn btn-sm  btn-ghost">
                    {user.displayName}
                  </button>
                </li>
                <li>
                  <Link to="/">
                    <button
                      className="btn btn-sm  btn-ghost"
                      onClick={logOutUser}
                    >
                      Logout
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="btn btn-sm  btn-ghost">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-sm  btn-ghost">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
