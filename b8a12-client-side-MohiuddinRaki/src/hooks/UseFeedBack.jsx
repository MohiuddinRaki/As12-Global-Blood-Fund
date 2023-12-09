import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseFeedBack = () => {
  const axiosPublic = UseAxiosPublic()
  const { refetch, data: allFeedbacks = [], isPending: loading } = useQuery({
    queryKey: ["userFeedBacks"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/userFeedBacks"
      );
      return res.data;
    },
  });
  return [allFeedbacks, refetch, loading];
};

export default UseFeedBack;

