import { useQuery } from "react-query";
import axios from "../api/axios";

export const useGetClassRegistrationData = () => {
  const {
    status: roomDataStatus,
    data: roomData,
    error: roomDataError,
  } = useQuery("roomsRecords", async () => {
    const res = await axios.get("rooms/records");
    return res.data;
  });
  const {
    status: subjectsDataStatus,
    data: subjectsData,
    error: subjectsDataError,
  } = useQuery("subjectsRecords", async () => {
    const res = await axios.get("subjects/records");
    return res.data;
  });
  const {
    status: teacherNamesDataStatus,
    data: teacherNamesData,
    error: teacherNamesDataError,
  } = useQuery("teacherNamesRecords", async () => {
    const res = await axios.get("teacher/names");
    return res.data;
  });

  return {
    roomDataStatus,
    roomData,
    roomDataError,
    subjectsDataStatus,
    subjectsData,
    subjectsDataError,
    teacherNamesDataStatus,
    teacherNamesData,
    teacherNamesDataError,
  };
};
