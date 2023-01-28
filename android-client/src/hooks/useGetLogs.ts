import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetLogs = (idNumber: string) => {
  const { status, data, error, isFetching } = useQuery('teachers', async () => {
    const res = await axios.get(
      `https://classroom-attendance-server-1.herokuapp.com/api/logs/${idNumber}`
    );
    return res.data;
  });

  return { status, data, error, isFetching };
};
