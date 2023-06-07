import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Registration/FormikControl";
import { Button, Container, Box, Space, Flex, Center } from "@mantine/core";
import { addUserData } from "../Service/OrderData";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
  phone: Yup.string().when("modeOfContact", {
    is: "telephonemoc",
    then: Yup.string().required("Required"),
  }),
});
const RegistrationForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const handleSubmit = (values) => {
    addUserData(values);
    // Handle form submission logic here
    console.log("Form data", values);
    navigate("/login");
  };

  return (
    <Container>
      <Box maw={400} mx="auto">
        <Flex justify={"center"}>
          <Logo />
        </Flex>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <FormikControl
                  control="input"
                  name="firstName"
                  label="First Name"
                  type="text"
                />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
                <FormikControl
                  control="input"
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
                <FormikControl
                  control="input"
                  name="email"
                  type="email"
                  label="Email"
                />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
                <FormikControl
                  control="input"
                  name="password"
                  type="password"
                  label="Password"
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <FormikControl
                  control="input"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div>{errors.confirmPassword}</div>
                ) : null}
                <Space h="md"></Space>
                <Button type="submit">Submit</Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
