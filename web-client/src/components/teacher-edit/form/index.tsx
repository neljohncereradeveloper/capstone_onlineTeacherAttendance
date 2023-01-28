import React, { useState } from "react";
import { Form, Formik } from "formik";
import LeftInput from "./leftInput";
import RightInput from "./rightInput";
import Alerts from "../../shared/alerts";
import { TeacherEditSchema } from "./validation";
import { useHistory } from "react-router";

interface TeacherProps {
  qrCode: string;
  department: string;
  name: string;
  idNumber: string;
  birthDate: string;
}
interface Props {
  state: TeacherProps;
}

const FormTeacherEdit: React.FC<Props> = ({ state }) => {
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [department, setDepartment] = useState<any | undefined>(
    state.department
  );
  return (
    <Formik
      initialValues={{
        name: state.name,
        idNumber: state.idNumber,
        birthDate: state.birthDate,
      }}
      validationSchema={TeacherEditSchema}
      onSubmit={(values, { setSubmitting, resetForm, setValues }) => {
        let options = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            idNumber: values.idNumber,
            birthDate: values.birthDate,
            department,
          }),
        };
        fetch(
          `${process.env.REACT_APP_BASE_URL}teacher/update/${state.qrCode}`,
          options
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setSubmitting(false);
              setIsSuccess(true);
              setValues({
                name: "",
                idNumber: "",
                birthDate: "",
              });
              setDepartment(undefined);
            } else {
              setSubmitting(false);
              setIsError("Teacher update Not Successfull");
            }
          })
          .catch((err) => {
            setSubmitting(false);
            setIsError("Teacher update Not Successfull");
            console.log("reg err : ", err);
          });

        setTimeout(() => {
          setIsSuccess(false);
          setIsError("");
          history.push("/teachers");
        }, 7000);
      }}
    >
      {(formik) => (
        <Form className="w-full">
          {isSuccess && (
            <Alerts top="10" success text="Teacher Updated Successfully" />
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

export default FormTeacherEdit;
