import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextInput, Button, Alert } from "@mantine/core";
import { getUserData } from "../Service/OrderData";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [registeredData, setRegisteredData] = useState([]);
  const getUser = async () => {
    await getUserData().then((res) => {
      // registeredData = res.data;
      setRegisteredData(res.data);
    });
  };
  const checkLoginData = async (loginData) => {
    // Retrieve the registered data from your database
    getUser();
    console.log("Register data", registeredData);
    const email = loginData.email;
    const password = loginData.password;
    // Compare the provided login values with the registered data
    const matchedUser = Object.values(registeredData).find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("isAuthenticated", true);
      navigate("/dashboard");
    } else {
      return alert("Invalid Credentials. Try again.");
    }
  };
  const handleSubmit = (values) => {
    // Handle form submission here
    checkLoginData(values);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
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
            {({ field, form }) => (
              <TextInput
                {...field}
                type="email"
                label="Email"
                placeholder="Enter your email address"
                error={form.touched.email && form.errors.email}
              />
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <TextInput
                {...field}
                type="password"
                label="Password"
                placeholder="Enter your password"
                error={form.touched.password && form.errors.password}
              />
            )}
          </Field>
          <Button type="submit" variant="filled">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
