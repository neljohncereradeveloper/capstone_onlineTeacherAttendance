import React from 'react';

interface teacherProps {
  payload: {
    idNumber: string;
    teacher: string;
    qrCode: string;
  };
}
interface Props {
  teacher: teacherProps;
  refresh: boolean;
}

export const useGetClassRoomAttendance = ({ teacher, refresh }: Props) => {
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    fetch(
      `https://classroom-attendance-server-1.herokuapp.com/api/attendance/teacher/records/classroom/${teacher.payload.teacher}/${teacher.payload.idNumber}`,
      options
    )
      .then((response) => response.json())
      .then(async (data: any) => {
        if (data.success) {
          setData(data.data);
        }
      })
      .catch((error) => {
        console.log('login error : ', error);
      });
  }, [refresh]);

  return { data };
};
