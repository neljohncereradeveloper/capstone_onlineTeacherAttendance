import { useQuery } from "react-query";
import axios from "../api/axios";

export const useGetClassRoomRecords = () => {
  const { status, data, error, isFetching, refetch } = useQuery(
    "classroomRecords",
    async () => {
      const res = await axios.get("attendance/records/classroom");
      return res.data;
    },
    {
      //Refetch the data every 2 second
      refetchInterval: 30000,
    }
  );

  return { status, data, error, isFetching, refetch };
};
