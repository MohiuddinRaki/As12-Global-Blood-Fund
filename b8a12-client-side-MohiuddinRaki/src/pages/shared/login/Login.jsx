import Swal from "sweetalert2";
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
// } from "react-simple-captcha";
import { useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
import UseAuth from "../../../hooks/UseAuth";
// import SocialLogin from "../socialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser } = UseAuth();
  const Navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signInUser(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successfully",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      Navigate(from, { replace: true });
    });
  };
  return (
    <>
      <Helmet>
        <title>Global Blood Fund || Login</title>
      </Helmet>
      <div className="pt-16">
        <h1 className="text-5xl text-center font-bold">Login Now!</h1>
        <div className="hero mt-14">
          <div className="card md:w-1/2 w-full max-w-xl shadow-2xl bg-base-100 pb-6">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">{/* <LoadCanvasTemplate /> */}</label>
              </div>
              <div className="form-control mt-6">
                <input
                  // disabled={disabled}
                  //   disabled={disabled}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            {/* <p>
              <small className="px-6">
                Do Not Have An Account? Please{" "}
                <Link to="/register">Register</Link>
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

export default Login;
