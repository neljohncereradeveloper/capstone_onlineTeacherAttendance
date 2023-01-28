import { useQuery } from "react-query";
import axios from "../api/axios";

export const useGetSettingsRecords = () => {
  const { status, data, error, isFetching, refetch } = useQuery(
    "settingsRecords",
    async () => {
      const res = await axios.get("settings/records");
      return res.data;
    },
    {
      //Refetch the data every 2 second
      refetchInterval: 30000,
    }
  );

  return { status, data, error, isFetching, refetch };
};
