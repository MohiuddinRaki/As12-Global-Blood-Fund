import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseUpazila = () => {
    const axiosPublic = UseAxiosPublic();
  
    const {data: donatorUpazila = [], isPending: loading, refetch} = useQuery({
        queryKey: ['donatorUpazila'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/donatorUpazila');
            return res.data;
        }
    })
    
    return [donatorUpazila, loading, refetch]
}

export default UseUpazila;
