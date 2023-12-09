import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";

const SocialLogin = () => {
  const { googleLoginUser } = UseAuth();
  const axiosPublic = UseAxiosPublic()
  const navigate =useNavigate()
  const handleGoogleLogin = () => {
    googleLoginUser().then((res) => {
      console.log(res.user);
      const userInfo = {
        email: res.user.email,
        name: res.user.displayName
      };
      axiosPublic.post("/donationUsers", userInfo)
      .then(res => {
        console.log(res.data)
        navigate("/")
      })
    });
  };
  return (
    <div>
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleLogin} className="btn px-6">
          <FaGoogle></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;