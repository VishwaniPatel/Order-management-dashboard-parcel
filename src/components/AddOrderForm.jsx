import {
  TextInput,
  Button,
  Group,
  Box,
  Select,
  FileInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, isNotEmpty } from "@mantine/form";
import useInput from "./use-input";
import { useEffect, useState } from "react";
import {
  addOrderData,
  getOrderById,
  patchOrderData,
} from "../Service/OrderData";
import { useParams } from "react-router-dom";
function AddOrderForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedOption] = useState(null);
  const [userNameValue, setUserNameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [base64, setBase64] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // fetch data from database to get order detail
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getOrderById(id);

        setUserNameValue(response.data.userName);
        setSelectedOption(response.data.status);
        setPriceValue(response.data.price);
        const date = new Date(response.data.dateNtime);
        setSelectedDate(date);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  // set values of input fields
  const userNameChangeHandler = (event) => {
    setUserNameValue(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPriceValue(event.target.value);
  };
  const dateChangeHandler = (date) => {
    setSelectedDate(date);
  };
  const selectChangeHandler = (option) => {
    setSelectedOption(option);
  };
  // const {
  //   value: userNameValue,
  //   valueChangeHandler: userNameChangeHandler,
  //   reset: resetUserName,
  // } = useInput();
  // const {
  //   value: priceValue,
  //   valueChangeHandler: priceChangeHandler,
  //   reset: resetPrice,
  // } = useInput();

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Dispatch", label: "Dispatch" },
    { value: "Completed", label: "Completed" },
  ];
  // set initial values of form
  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      date: "",
    },

    // form validation
    validate: {
      date: isNotEmpty("Name cannot be empty"),
      age: isNotEmpty("Age cannot be empty"),
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  // submit the data on click event
  const submitHandler = (event) => {
    event.preventDefault();
    let payload = { image: base64 };
    console.log(payload);
    const order = {
      userName: userNameValue,
      status: selectedValue,
      price: priceValue,
      dateNtime: selectedDate,
      profileImage: payload,
    };
    // performs when order updated
    if (id) {
      patchOrderData(id, order);
    }
    // when new order is added
    else {
      addOrderData(order);
    }
    setSelectedOption("");
    setSelectedDate("");
    setUserNameValue("");
    setPriceValue("");
  };
  const onChange = (e) => {
    console.log("file", e?.target?.files[0]);
    let file = e?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };
  const photoUpload = (e) => {
    // e.preventDefault();
    const reader = new FileReader();
    const file = e?.target?.files[0];
    console.log("reader", reader);
    console.log("file", file);
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setSize(file.size);
        setName(file.name);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box maw={300} mx="auto">
      <form onSubmit={submitHandler} onChange={(e) => onChange(e)}>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          value={userNameValue}
          onChange={userNameChangeHandler}
        />
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
        {/* <input type="file" name="avatar" id="file" accept=".jpef, .png, .jpg" onChange={photoUpload} src={imagePreview} /> */}
        <FileInput
          label="Upload files"
          mt="md"
          placeholder="Upload files"
          accept="image/png,image/jpeg"
          onChange={photoUpload}
          src={imagePreview}
        />
        <img src={imagePreview} alt="User Image" />
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
