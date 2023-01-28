import React from "react";
import { Form, Formik } from "formik";
import Input from "../shared/input";
import { loginSchema } from "./validation";
import Button from "../shared/button";
import { iconSubmit } from "../../assets/icons";
import { useAppDispatch } from "../../redux/store";
import { isLoggedIn_true } from "../../redux/slice/loggedinSlice";

const LoginComponents: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Formik
        initialValues={{ userName: "admin", password: "admin" }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (values.userName === "admin" && values.password === "admin") {
            setSubmitting(false);
            dispatch(isLoggedIn_true());
            window.alert("Login Successfull");
          } else {
            setSubmitting(false);
            window.alert("Login Not Successfull");
          }
        }}
      >
        {(formik) => (
          <Form className="bg-gray-100 w-2/5 p-10 flex flex-col rounded-md">
            <h1 className="text-gray-500 text-center text-3xl mb-10">Login</h1>
            <Input
              hasIcon={false}
              placeholder="type here ..."
              type="text"
              id="userName"
              name="userName"
              size="base"
              mb="lg"
              label="User Name"
              labelColor="gray"
              disabled
            />
            <Input
              hasIcon={false}
              placeholder="type here ..."
              type="text"
              id="password"
              name="password"
              size="base"
              mb="lg"
              label="Password"
              labelColor="gray"
              disabled
            />

            <Button
              type="submit"
              text="Submit"
              size="lg"
              icon="right"
              iconPath={iconSubmit}
              isLoading={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginComponents;
