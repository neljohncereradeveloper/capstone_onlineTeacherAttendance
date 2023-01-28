import React from "react";
import DropDown from "../../../shared/dropDown";
import { useGetClassRegistrationData } from "../../../../hooks/useGetClassRegistrationData";

interface Props {
  classRoom: any;
  setClassRoom: any;
  teacher: any;
  setTeacher: any;
  subject: any;
  setSubject: any;
}

const LeftInput: React.FC<Props> = ({
  classRoom,
  setClassRoom,
  teacher,
  setTeacher,
  subject,
  setSubject,
}) => {
  const { roomData, subjectsData, teacherNamesData } =
    useGetClassRegistrationData();
  return (
    <div className="flex-1 flex flex-col justify-center p-10">
      <DropDown
        label="Classroom"
        data={roomData?.data}
        state={classRoom}
        setState={setClassRoom}
      />
      <DropDown
        label="Teacher"
        data={teacherNamesData?.data}
        state={teacher}
        setState={setTeacher}
      />
      <DropDown
        label="Subject"
        data={subjectsData?.data}
        state={subject}
        setState={setSubject}
      />
    </div>
  );
};

export default LeftInput;
