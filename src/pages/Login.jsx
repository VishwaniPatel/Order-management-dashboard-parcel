import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextInput, Button, Box, Space, Flex } from "@mantine/core";
import { getUserData } from "../Service/OrderData";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import * as Yup from "yup";
import { useAuth } from "../context/ProductContext";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});
const LoginForm = () => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const [registeredData, setRegisteredData] = useState([]);

  const checkLoginData = (loginData) => {
    const email = loginData.email;
    const password = loginData.password;

    const matchedUser = Object.values(registeredData).find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isAuthenticated", true);
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
      navigate("/order/dashboard");
    } else {
      alert("Invalid Credentials. Try again.");
    }
  };

  const handleSubmit = (values) => {
    checkLoginData(values);
  };

  useEffect(() => {
    const getUser = async () => {
      await getUserData().then((res) => {
        setRegisteredData(res.data);
      });
    };
  }, []);

  return (
    <Flex justify={"center"} align={"center"}>
      <Box maw={400} mx="auto">
        <Flex justify={"center"}>
          <Logo />
        </Flex>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="email"
                    label="Email"
                    placeholder="Enter your email address"
                  />
                )}
              </Field>
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <Space h="md"></Space>
              <Field name="password">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                )}
              </Field>
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              <Space h="md"></Space>
              <Button type="submit" variant="filled">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default LoginForm;
