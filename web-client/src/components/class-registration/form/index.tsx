import React, { useState } from "react";
import { Form, Formik } from "formik";
import LeftInput from "./leftInput";
import RightInput from "./rightInput";
import Alerts from "../../shared/alerts";

// type SemesterProps = '1st Semester' | '2nd Semester' | 'choose';
// type termProps = '1st Term' | '2nd Term' | 'Semestral' | 'choose';
// interface ClassProps {
//   classRoom: string;
//   idNumber: string;
//   subject: string;
//   teacher: string;
//   year: string;
// }

const initialValues = {
  year: "",
};

const FormClassRegistration = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [classRoom, setClassRoom] = useState("choose");
  const [teacher, setTeacher] = useState("choose");
  const [schedule, setSchedule] = useState("choose");
  const [subject, setSubject] = useState("choose");
  const [subjectTime, setSubjectTime] = useState("choose");

  const handleReset = () => {
    setSchedule("choose");
    setSubjectTime("choose");
    setClassRoom("choose");
    setTeacher("choose");
    setSubject("choose");
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (schedule === "choose" || subjectTime === "choose") {
          setSubmitting(false);
          setIsError("Please Fill up Completely");
        } else {
          let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              classRoom,
              teacher,
              subject,
              subjectTime,
              schedule,
            }),
          };

          fetch(`${process.env.REACT_APP_BASE_URL}class/registration`, options)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setSubmitting(false);
                setIsSuccess(true);
                setSchedule("choose");
                setSubjectTime("choose");
                setClassRoom("choose");
                setTeacher("choose");
                setSubject("choose");
              } else {
                setSubmitting(false);
                setIsError("Class registration Not Successfull");
              }
            })
            .catch((err) => {
              setSubmitting(false);
              setIsError("Class registration Not Successfull");
              console.log("reg err : ", err);
            });
        }

        setTimeout(() => {
          setIsSuccess(false);
          setIsError("");
        }, 7000);
      }}
    >
      {(formik) => (
        <Form className="w-full">
          {isSuccess && (
            <Alerts top="10" success text="Class added Successfully" />
          )}
          {isError && <Alerts top="10" _error text={isError} />}
          <div className="flex flex-row">
            <LeftInput
              classRoom={classRoom}
              setClassRoom={setClassRoom}
              teacher={teacher}
              setTeacher={setTeacher}
              subject={subject}
              setSubject={setSubject}
            />
            <RightInput
              formik={formik}
              subjectTime={subjectTime}
              setSubjectTime={setSubjectTime}
              schedule={schedule}
              setSchedule={setSchedule}
              handleReset={handleReset}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormClassRegistration;
