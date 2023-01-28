import { useQuery } from "react-query";
import axios from "../api/axios";

export const useGetCampusRecords = () => {
  const { status, data, error, isFetching } = useQuery(
    "campusRecords",
    async () => {
      const res = await axios.get("attendance/records/campus");
      return res.data;
    },
    {
      //Refetch the data every 2 second
      refetchInterval: 30000,
    }
  );

  return { status, data, error, isFetching };
};
