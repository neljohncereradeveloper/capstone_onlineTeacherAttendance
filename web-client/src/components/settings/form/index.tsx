import React, { useState } from "react";
import { Form, Formik } from "formik";
import { iconCancel, iconSubmit } from "../../../assets/icons";
import Alerts from "../../shared/alerts";
import DropDown from "../../shared/dropDown";
import Input from "../../shared/input";
import Button from "../../shared/button";

type SemesterProps = "1st Semester" | "2nd Semester";
type TermProps = "1st Term" | "2nd Term";

interface Props {
  openForm: boolean;
  refetch: any;
}

const SettingsForm: React.FC<Props> = ({ openForm, refetch }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState("");
  const [semester, setSemester] = useState<SemesterProps | undefined>();
  const [term, setTerm] = useState<TermProps>();
  const handleReset = () => {
    setSemester(undefined);
    setTerm(undefined);
  };
  return (
    <Formik
      initialValues={{ year: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        let options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            semester,
            term,
            year: values.year,
          }),
        };

        fetch(`${process.env.REACT_APP_BASE_URL}settings/update`, options)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              refetch();
              setSubmitting(false);
              setIsSuccess(true);
              resetForm();
              setSemester(undefined);
              setTerm(undefined);
            } else {
              setSubmitting(false);
              setIsError("Settings Update Not Successfull");
            }
          })
          .catch((err) => {
            setSubmitting(false);
            setIsError("Settings Update Not Successfull");
            console.log("reg err : ", err);
          });
      }}
    >
      {(formik) => (
        <Form className="flex-1 border border-gray-500 p-10 rounded">
          {isSuccess && (
            <Alerts top="10" success text="Settings Updated Successfully" />
          )}
          {isError && <Alerts top="10" _error text={isError} />}
          {openForm ? (
            <>
              <DropDown
                label="Semester"
                data={["1st Semester", "2nd Semester"]}
                state={semester as any}
                setState={setSemester as any}
              />
              <DropDown
                label="Term"
                data={["1st Term", "2nd Term"]}
                state={term as any}
                setState={setTerm as any}
              />
              <Input
                hasIcon={false}
                placeholder="type here ..."
                type="text"
                id="year"
                name="year"
                size="base"
                mb="lg"
                label="Year"
                labelColor="gray"
              />
              <Button
                type="submit"
                text="Submit"
                size="base"
                icon="right"
                iconPath={iconSubmit}
                isLoading={formik.isSubmitting}
              />
              <Button
                backGroundColor="red"
                type="reset"
                text="Reset"
                size="base"
                icon="right"
                ml="base"
                iconPath={iconCancel}
                isLoading={formik.isSubmitting}
                onClick={handleReset}
              />
            </>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;
