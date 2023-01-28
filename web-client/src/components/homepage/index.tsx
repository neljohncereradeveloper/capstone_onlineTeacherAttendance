/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useGetClassRoomRecords } from "../../hooks/useGetClassRoomRecords";
import { formatDate } from "../../lib/formatDate";
import ContainerEnded from "./ended";
import ContainerOngoing from "./ongoing";
import Table from "./table";
import produce from "immer";
import ContainerAbsent from "./absent";
import ContainerLates from "./late";

export interface ClassAttendanceProps {
  classId: string;
  date: string;
  classRoom: string;
  subject: string;
  subjectTime: string;
  teaher: string;
  idNumber: string;
  timeIn: string;
  timeOut: string;
  status: string;
  remarks: string;
}

interface DataClassessProps {
  id: string;
  date: string;
  classRoom: string;
  subject: string;
  subjectTime: string;
  teacher: string;
  teacherid: string;
  timeIn: string;
  timeOut: string;
  status: string;
  remarks: string;
}

const HomePageComponents: React.FC = () => {
  const { data } = useGetClassRoomRecords();
  const [todaysClasses, setTodaysClasses] = React.useState<any[]>([]);
  const [dataClasses, setDataClasses] = React.useState<any[]>([]);
  const [refresh, setRefresh] = React.useState(false);
  /** FILTERS */
  const onGoing = data?.data.filter(
    (record: any[]) =>
      record[9] === "IN" && record[1] === formatDate(new Date())
  );
  const ended = data?.data.filter(
    (record: any[]) =>
      record[9] === "OUT" && record[1] === formatDate(new Date())
  );
  const absenses = data?.data.filter((record: any[]) => {
    return record[10] === "absent" && formatDate(new Date()) === record[1];
  });
  const lates = data?.data.filter((record: any[]) => record[10] === "late");
  /** FUNCTIONS */
  const fetchClasses = () => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    fetch(
      `${process.env.REACT_APP_BASE_URL}attendance/records/classroom/today`,
      options
    )
      .then((response) => response.json())
      .then(async (data: any) => {
        if (data.success) {
          setDataClasses(data.data);
        }
      })
      .catch((error) => {
        console.log("homepage fetch class error : ", error);
      });
  };

  const setClassesData = () => {
    setTodaysClasses([]);
    dataClasses?.map((row: DataClassessProps) => {
      // console.log("row : ", row);
      if (row.id === "ID") {
        return null;
      }
      setTodaysClasses(
        produce((draft) => {
          draft.push({
            id: row.id,
            classRoom: row.classRoom,
            teaher: row.teacher,
            idNumber: row.teacherid,
            sched: row.date,
            subject: row.subject,
            subjectTime: row.subjectTime,
            remarks: row.remarks,
          });
        })
      );
    });
  };

  React.useEffect(() => {
    fetchClasses();
    setClassesData();
    // setClassOnAttendanceFunc();
  }, [refresh]);

  return (
    <div className="w-full flex flex-row p-5">
      <div className="flex-1 mr-5">
        <p>Todays Classes</p>
        <button
          className="mb-5 mt-5 p-1 px-3 bg-blue-500 text-white hover:bg-blue-900"
          onClick={() => setRefresh((prev) => !prev)}
        >
          Load Classes
        </button>
        <Table data={todaysClasses} />
      </div>
      <div className="flex flex-col h-full w-1/4">
        <ContainerOngoing data={onGoing} />
        <ContainerEnded data={ended} />
        <ContainerAbsent data={absenses} />
        <ContainerLates data={lates} />
      </div>
    </div>
  );
};

export default HomePageComponents;
