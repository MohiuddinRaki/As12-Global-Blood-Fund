import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b8a12-server-side-mohiuddin-raki.vercel.app",
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;

