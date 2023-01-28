import React, { useState } from "react";
import { Form, Formik } from "formik";
import LeftInput from "./leftInput";
import RightInput from "./rightInput";
import { TeacherRegistrationSchema } from "./validation";
import { TeacherProps } from "../../../types";
import Alerts from "../../shared/alerts";

type DepartmentProps = "BSIT" | "HRDM";

const initialValues: TeacherProps = {
  Name: "",
  IdNumber: "",
  BirthDate: "",
  UserName: "",
  Password: "password",
};

const FormTeacherRegistration = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [department, setDepartment] = useState<DepartmentProps>();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TeacherRegistrationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        let options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: values.Name,
            IdNumber: values.IdNumber,
            BirthDate: values.BirthDate,
            Department: department,
            UserName: values.UserName,
            Password: values.Password,
          }),
        };

        fetch(`${process.env.REACT_APP_BASE_URL}teacher/registration`, options)
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Registration Successfull.") {
              setSubmitting(false);
              setIsSuccess(true);
              resetForm();
              setDepartment(undefined);
            } else {
              setSubmitting(false);
              setIsError("Registration Not Successfull");
            }
          })
          .catch((err) => {
            setSubmitting(false);
            setIsError("Registration Not Successfull");
            console.log("reg err : ", err);
          });

        setTimeout(() => {
          setIsSuccess(false);
          setIsError("");
        }, 7000);
      }}
    >
      {(formik) => (
        <Form className="w-full">
          {isSuccess && (
            <Alerts top="10" success text="Registered Successfully" />
          )}
          {isError && <Alerts top="10" _error text={isError} />}
          <div className="flex flex-row">
            <LeftInput department={department} setDepartment={setDepartment} />
            <RightInput formik={formik} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormTeacherRegistration;
