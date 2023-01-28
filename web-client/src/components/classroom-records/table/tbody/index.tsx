/* eslint-disable jsx-a11y/anchor-is-valid */
import shortid from "shortid";
import React from "react";
import classnames from "classnames";

interface Props {
  data: any[] | null;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  refetch: any;
  filterBy: string;
}
// body
const Tbody: React.FC<Props> = ({
  data,
  setIsSuccess,
  setIsError,
  refetch,
  filterBy,
}) => {
  const handleLogout = (classId: any) => {
    const logout = window.confirm("Do you want to forcely logout this class?");
    if (logout) {
      let options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId,
        }),
      };

      fetch(
        "https://classroom-attendance-server-1.herokuapp.com/api/attendance/forgot-logout",
        options
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            refetch();
            setIsSuccess(true);
          }
        })
        .catch((err) => {
          setIsError("Class force logout Not Successfull");
          console.log("teacher delete error : ", err);
        });
      setTimeout(() => {
        setIsSuccess(false);
        setIsError("");
      }, 7000);
    }
  };
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data
        ?.filter((row) => {
          if (filterBy === "all") {
            return (
              row[10] === "present" ||
              row[10] === "absent" ||
              row[10] === "late"
            );
          } else {
            return row[10] === filterBy;
          }
        })
        .map((record: any[]) => {
          if (record[1] === "Date") {
            return null;
          }
          return (
            <tr key={shortid.generate()}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record[1]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record[2]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record[3]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record[4]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record[5]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record[7]}
              </td>
              <td
                className={classnames({
                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500":
                    record[8] !== "Force Logout",
                  "px-6 py-4 whitespace-nowrap text-sm text-white bg-red-300":
                    record[8] === "Force Logout",
                })}
              >
                {record[8]}
              </td>
              <td
                className={classnames({
                  "px-6 py-4 whitespace-nowrap text-sm text-red-100 bg-red-500":
                    record[9] === "NONE",
                  "px-6 py-4 whitespace-nowrap text-sm text-blue-100 bg-blue-500":
                    record[9] === "IN",
                  "px-6 py-4 whitespace-nowrap text-sm text-gray-100 bg-gray-500":
                    record[9] === "OUT",
                })}
              >
                {record[9]}
              </td>
              <td
                className={classnames({
                  "px-4 py-4 whitespace-nowrap text-sm text-green-100 bg-green-500":
                    record[10] === "present",
                  "px-4 py-4 whitespace-nowrap text-sm text-red-100 bg-red-500":
                    record[10] === "absent",
                  "px-4 py-4 whitespace-nowrap text-sm text-yellow-100 bg-yellow-500":
                    record[10] === "late",
                })}
              >
                {record[10]}
              </td>
              {!record[8] && record[7] ? (
                <td className="mt-2 flex py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => handleLogout(record[0] as any)}
                    className="text-sm
            underline
            text-red-500
            text-bold
            dark:text-red-200
            hover:text-red-900
            dark:hover:text-red-400
            ml-2
          "
                  >
                    Force Logout
                  </button>
                </td>
              ) : null}
            </tr>
          );
        })}
    </tbody>
  );
};

export default Tbody;
