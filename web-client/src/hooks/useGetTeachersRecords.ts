import { useQuery } from "react-query";
import axios from "../api/axios";

export const useGetTeachersRecords = () => {
  const { status, data, error, isFetching, refetch } = useQuery(
    "teachers",
    async () => {
      const res = await axios.get("teacher/records");
      return res.data;
    },
    {
      //Refetch the data every 2 second
      refetchInterval: 60000,
      cacheTime: 60000,
    }
  );

  return { status, data, error, isFetching, refetch };
};
