import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import { Text } from "@mantine/core";
function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <>
      <Text>{label}</Text>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}

export default Input;
