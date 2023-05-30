import React from "react";
import Input from "./Input";
import { TextInput } from "@mantine/core";
function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <TextInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
