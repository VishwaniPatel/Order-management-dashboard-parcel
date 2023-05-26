import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/Registration/FormikControl";
import { Button } from "@mantine/core";
import { addUserData } from "../Service/OrderData";
import { useNavigate } from "react-router-dom";
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
  const handleSubmit = (values) => {
    addUserData(values);
    // Handle form submission logic here
    console.log("Form data", values);
    navigate("/login");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              name="firstName"
              label="First Name"
              type="text"
            />

            <FormikControl
              control="input"
              name="lastName"
              label="Last Name"
              type="text"
            />
            <FormikControl
              control="input"
              name="email"
              type="email"
              label="Email"
            />
            <FormikControl
              control="input"
              name="password"
              type="password"
              label="Password"
            />
            <FormikControl
              control="input"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <Button type="submit" disabled={!formik.isValid}>
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegistrationForm;
