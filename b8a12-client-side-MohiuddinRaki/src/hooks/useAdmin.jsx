import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
// import UseAxiosSecure from "./UseAxiosSecure";
import UseAxiosPublic from "./UseAxiosPublic";

const useAdmin = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  //   const axiosSecure = UseAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      console.log("asking or checking is admin", user);
      const res = await axiosPublic.get(
        `/dashboard/donationUsers/${user.email}`
      );
      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
