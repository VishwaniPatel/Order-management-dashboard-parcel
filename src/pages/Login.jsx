import React from "react";
import { Formik, Form, Field } from "formik";
import { TextInput, Button } from "@mantine/core";

const LoginForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
  };

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
          <Button type="submit" variant="filled" loading={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
