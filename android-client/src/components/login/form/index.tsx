import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { secureStoreSave } from "../../../lib/secureStore";
import { useAppDispatch } from "../../../redux/store";
import { set_loggedin_true } from "../../../redux/slice/login";
import { set_teacher } from "../../../redux/slice/teacher";

interface DataProps {
  message: string;
  teacher: {
    IdNumber: string;
    Name: string;
    QrCode: string;
  };
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={{ userName: "", password: "" }}
      onSubmit={async (values) => {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            UserName: values.userName,
            Password: values.password,
          }),
        };
        fetch(`http://192.168.0.17:3005/api/teacher/login`, options)
          .then((response) => response.json())
          .then(async (data: DataProps) => {
            console.log("login : ", data);
            if (data.message === "Login Successfull") {
              const name = data.teacher.Name;
              const idNumber = data.teacher.IdNumber;
              const qrCode = data.teacher.QrCode;
              dispatch(set_teacher({ idNumber, teacher: name, qrCode }));
              dispatch(set_loggedin_true());
            }
          })
          .catch((error) => {
            console.log("login error : ", error);
          });
      }}
    >
      {(formik) => (
        <>
          <Text style={styles.label}>Username</Text>
          <TextInput
            onChangeText={formik.handleChange("userName")}
            onBlur={formik.handleBlur("userName")}
            value={formik.values.userName}
            style={{
              backgroundColor: "white",
              padding: 12,
              paddingHorizontal: 20,
              width: "80%",
              borderRadius: 10,
              marginBottom: 10,
            }}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            value={formik.values.password}
            style={{
              backgroundColor: "white",
              padding: 12,
              paddingHorizontal: 20,
              width: "80%",
              borderRadius: 10,
            }}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={{
              width: "80%",
              backgroundColor: "blue",
              padding: 15,
              marginTop: 20,
              borderRadius: 10,
            }}
            onPress={() => formik.handleSubmit()}
          >
            <Text style={{ alignSelf: "center", color: "white" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  label: {
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 35,
    marginBottom: 10,
  },
});
