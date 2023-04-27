import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Select,
  FileInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, isNotEmpty } from "@mantine/form";
import useInput from "./use-input";
import { useState } from "react";
import { addOrderData } from "../Service/OrderData";
import axios from "axios";
function AddOrderForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedOption] = useState(null);

  const dateChangeHandler = (date) => {
    setSelectedDate(date);
  };
  const selectChangeHandler = (option) => {
    setSelectedOption(option);
  };
  const {
    value: userNameValue,
    valueChangeHandler: userNameChangeHandler,
    reset: resetUserName,
  } = useInput();
  const {
    value: priceValue,
    valueChangeHandler: priceChangeHandler,
    reset: resetPrice,
  } = useInput();

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Dispatch", label: "Dispatch" },
    { value: "Completed", label: "Completed" },
  ];
  const form = useForm({
    initialValues: {
      //   email: "",
      //   termsOfService: false,
      name: "",
      price: "",
      date: "",
    },

    validate: {
      //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      date: isNotEmpty("Name cannot be empty"),
      age: isNotEmpty("Age cannot be empty"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });
  const submitHandler = (event) => {
    event.preventDefault();
    const order = {
      userName: userNameValue,
      status: selectedValue,
      price: priceValue,
      dateNtime: selectedDate,
    };
    console.log("Submitted!");
    console.log("Order", order);
    console.log(userNameValue, priceValue, selectedDate, selectedValue);
    addOrderData(order);
    // axios.post(
    //   "https://order-management-dashboard-default-rtdb.firebaseio.com/orders.json",
    //   {
    //     userName: userNameValue,
    //     status: selectedValue,
    //     price: priceValue,
    //     dateNtime: selectedDate,
    //   }
    // );
    resetUserName();
    resetPrice();
    setSelectedOption("");
    setSelectedDate("");
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={submitHandler}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          value={userNameValue}
          onChange={userNameChangeHandler}
        />
        {/* <TextInput
          mt="md"
          label="Email"
          placeholder="Email"
          {...form.getInputProps("email")}
        /> */}
        <TextInput
          mt="md"
          label="Price"
          placeholder="Enter Price"
          {...form.getInputProps("price")}
          value={priceValue}
          onChange={priceChangeHandler}
        />
        <DateInput
          valueFormat="YYYY MMM DD"
          label="Date input"
          placeholder="Date input"
          maw={400}
          mt="md"
          {...form.getInputProps("date")}
          value={selectedDate}
          onChange={dateChangeHandler}
        />
        <Select
          label="Select status"
          placeholder="Pick one"
          mt="md"
          data={options}
          value={selectedValue}
          onChange={selectChangeHandler}
        />
        {/* <FileInput
          label="Upload files"
          mt="md"
          placeholder="Upload files"
          accept="image/png,image/jpeg"
        /> */}
        {/* <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        /> */}

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
export default AddOrderForm;
