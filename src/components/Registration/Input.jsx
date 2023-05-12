import React from "react";
import { Field, ErrorMessage } from "formik";
import FormikControl from "./FormikControl";
import { TextInput } from "@mantine/core";
import TextError from "../TextError";
function Input(props) {
  const { label, name, ...rest } = props;
  return (
    // <TextInput label={name}>
    //   <Field id={name} name={name} {...rest} />
    //   <ErrorMessage component={TextError} name={name} />
    // </TextInput>

    <Field id={name} name={name} {...rest}>
      {({ field, form }) => (
        <TextInput label={name} {...rest} {...field}>
          {/* <Field  /> */}
          <ErrorMessage component={TextError} name={name} />
        </TextInput>
        //   <FormLabel htmlFor={name}>{label}</FormLabel>?
        //   <TextInput id={name} {...rest} {...field} />
        //   <ErrorMessage component={TextError} name={name} />
      )}
    </Field>
  );
}

export default Input;
