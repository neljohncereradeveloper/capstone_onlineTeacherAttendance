/* eslint-disable jsx-a11y/anchor-is-valid */
import shortid from "shortid";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data: any[] | null;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  refetch: any;
}

interface DataProps {
  birthDate: string;
  department: string;
  idNumber: string;
  isActive: string;
  name: string;
  qrCode: string;
}

const Tbody: React.FC<Props> = ({
  data,
  setIsSuccess,
  setIsError,
  refetch,
}) => {
  const handleDelete = (qr: any) => {
    const _delete = window.confirm(
      "Do you want to delete this teacher account ?"
    );
    if (_delete) {
      let options = {
        method: "PUT",
      };

      fetch(`${process.env.REACT_APP_BASE_URL}teacher/delete/${qr}`, options)
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
          setIsError("Teacher Deletion Not Successfull");
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
      {data?.map((record: DataProps) => {
        return (
          <tr key={shortid.generate()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record.qrCode}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record.idNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record.birthDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record.department}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={record.isActive === "TRUE" ? true : false}
                readOnly={true}
              />
            </td>
            <td className="mt-2 flex py-4 whitespace-nowrap text-left text-sm font-medium">
              <Link
                className="
            text-sm
            underline
            text-blue-500
            dark:text-blue-200
            hover:text-blue-900
            dark:hover:text-blue-400
          "
                to={{
                  pathname: "/teacher-edit",
                  state: {
                    qrCode: record.qrCode,
                    department: record.department,
                    name: record.name,
                    idNumber: record.idNumber,
                    birthDate: record.birthDate,
                  },
                }}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(record.qrCode)}
                className="
              
            text-sm
            underline
            text-red-500
            dark:text-red-200
            hover:text-red-900
            dark:hover:text-red-400
            ml-2
          "
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;
