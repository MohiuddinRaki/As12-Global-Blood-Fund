import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseUserInfo = () => {
  const axiosPublic = UseAxiosPublic();
  const {
    data: userInfo = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["donationUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donationUsers");
      return res.data;
    },
  });
  return [userInfo, refetch, loading];
};

export default UseUserInfo;
