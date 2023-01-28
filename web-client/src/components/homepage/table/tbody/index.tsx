// import classNames from 'classnames';
import React from "react";
import { generate } from "shortid";

interface Props {
  data: any[] | null;
  setIsSuccess: any;
  setIsError: any;
}

interface classProps {
  active?: string;
  classRoom: string;
  id?: string;
  idNumber: string;
  sched?: string;
  subject: string;
  subjectTime: string;
  teaher: string;
  remarks: string;
}

const Tbody: React.FC<Props> = ({ data, setIsSuccess, setIsError }) => {
  const dt = new Date();
  const time = dt.toLocaleTimeString("us", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    timeZone: "Asia/Manila",
  });
  const useDateTime = time.split(" ");
  const daysString = useDateTime[1];
  const currTime = useDateTime[0].split(":");
  const currHour = currTime[0];

  const handleAbsent = (data: classProps) => {
    const makeAbsent = window.confirm(
      `Do you want to set CLASS ${data.subject} by ${data.teaher} as ABSENT ?`
    );
    if (makeAbsent) {
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacher: data.teaher,
          idNumber: data.idNumber,
          classRoom: data.classRoom,
          subject: data.subject,
          subjectTime: data.subjectTime,
          classRoomAttendanceId: data.id,
        }),
      };

      fetch(
        `${process.env.REACT_APP_BASE_URL}attendance/teacher-absent`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.isAlreadyAbsent === true) {
            setIsError(data.message);
          } else {
            setIsSuccess(true);
          }
        })
        .catch((err) => {
          setIsError("Registration Not Successfull");
          console.log("teacher absent err : ", err);
        });

      setTimeout(() => {
        setIsSuccess(false);
        setIsError("");
      }, 7000);
    }
  };

  return (
    <tbody className="bg-white m-h-5 bg-local divide-y divide-gray-200">
      {data?.map((row: classProps) => {
        const _time = row.subjectTime.split(" ");
        const hours = _time[0].split("-");
        const classBegHour = hours[0].split(":");
        const classEndHour = hours[1].split(":");
        if (row.teaher === "Teacher") {
          return null;
        }
        return (
          <tr key={generate()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {row.classRoom}
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {row.teaher}
                  </div>
                  <div className="text-sm text-gray-500">{row.idNumber}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {row.sched}
            </td>
            <td className="pl-5 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {row.subject}
              </div>
              <div className="text-sm text-gray-500">{row.subjectTime}</div>
            </td>
            {daysString === "AM" ? (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Upcoming
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleAbsent(row)}
                    className="p-2 bg-red-500 text-white hover:bg-red-900"
                  >
                    Absent
                  </button>
                </td>
              </>
            ) : daysString === "PM" ? (
              <>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    row.remarks === "absent" ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {row.remarks === "absent"
                    ? "Absent"
                    : parseInt(currHour) === parseInt(classBegHour[0]) &&
                      parseInt(currHour) < parseInt(classEndHour[0])
                    ? "Started"
                    : parseInt(currHour) <= parseInt(classBegHour[0])
                    ? "Upcoming"
                    : parseInt(currHour) >= parseInt(classEndHour[0])
                    ? "Ended"
                    : null}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.remarks === "absent" ? null : (
                    <button
                      onClick={() => handleAbsent(row)}
                      className="p-2 bg-red-500 text-white hover:bg-red-900"
                    >
                      Absent
                    </button>
                  )}
                </td>
              </>
            ) : null}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;
