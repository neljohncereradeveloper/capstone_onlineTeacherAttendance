import { useQuery } from "react-query";
import axios from "../api/axios";

export const useGetClassRecords = () => {
  const { status, data, error, isFetching } = useQuery(
    "classRecords",
    async () => {
      const res = await axios.get("class/records");
      return res.data;
    },
    {
      //Refetch the data every 2 second
      refetchInterval: 30000,
    }
  );

  return { status, data, error, isFetching };
};
