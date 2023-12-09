import { useQuery } from "@tanstack/react-query";
// import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseDonorRequest = () => {
  const axiosSecure = UseAxiosSecure();
  // const { user } = UseAuth();
  const { refetch, data: createRequest = [] } = useQuery({
    // queryKey: ["donatorCreateRequest", user?.email],
    queryKey: ["donatorCreateRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        // `/donatorCreateRequest?email=${user.email}`
        "/donatorCreateRequest"
      );
      return res.data;
    },
  });
  return [createRequest, refetch];
};

export default UseDonorRequest;
