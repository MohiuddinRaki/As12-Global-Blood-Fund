import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseDistrict = () => {
    const axiosPublic = UseAxiosPublic();
  
    const {data: donatorDistrict = [], isPending: loading, refetch} = useQuery({
        queryKey: ['donatorDistrict'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/donatorDistrict');
            return res.data;
        }
    })
    
    return [donatorDistrict, loading, refetch]
}

export default UseDistrict;
