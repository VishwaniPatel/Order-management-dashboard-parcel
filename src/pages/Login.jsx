import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextInput,
  Button,
  Container,
  Box,
  Space,
  Flex,
  Center,
} from "@mantine/core";
import { getUserData } from "../Service/OrderData";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
const LoginForm = () => {
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
      navigate("/");
    } else {
      alert("Invalid Credentials. Try again.");
    }
  };

  const handleSubmit = (values) => {
    checkLoginData(values);
  };

  useEffect(() => {
    const sessionDuration = 1 * 60 * 1000; // 1 hour in milliseconds

    const handleUserInteraction = () => {
      localStorage.setItem("lastInteraction", Date.now());
    };

    const checkSessionTimeout = () => {
      const lastInteraction = localStorage.getItem("lastInteraction");
      const currentTime = Date.now();

      if (currentTime - lastInteraction >= sessionDuration) {
        logout();
      }
    };

    const logout = () => {
      localStorage.clear();
      navigate("/login");
    };

    const initTimeout = () => {
      document.addEventListener("mousemove", handleUserInteraction);
      document.addEventListener("keydown", handleUserInteraction);
      setInterval(checkSessionTimeout, 1000); // Check session timeout every second
    };

    const getUser = async () => {
      await getUserData().then((res) => {
        setRegisteredData(res.data);
      });
    };

    getUser();

    if (localStorage.getItem("isAuthenticated")) {
      localStorage.setItem("lastInteraction", Date.now());
      initTimeout();
    }
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
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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
              <Space h="md"></Space>
              <Button type="submit" variant="filled" disabled={isSubmitting}>
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
