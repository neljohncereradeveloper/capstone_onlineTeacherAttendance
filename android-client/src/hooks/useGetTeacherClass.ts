import React from "react";

interface teacherProps {
  payload: {
    idNumber: string;
    teacher: string;
    qrCode: string;
  };
}

export const useGetTeacherClass = (teacher: any) => {
  const [data, setDataClasses] = React.useState<any[]>([]);

  React.useEffect(() => {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    fetch(
      `http://192.168.0.17:3005/api/class/teacher/${
        (teacher as teacherProps).payload.idNumber
      }`,
      options
    )
      .then((response) => response.json())
      .then(async (data: any) => {
        console.log("datas : ", data);
        if (data.success) {
          setDataClasses(data.data);
        }
      })
      .catch((error) => {
        console.log("datas error : ", error);
      });
  }, []);

  return { data };
};
