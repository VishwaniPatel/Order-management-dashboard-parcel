import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { useForm, isNotEmpty } from "@mantine/form";
import { Button, Box, Group, TextInput, Text } from "@mantine/core";
import { addProductData } from "../Service/OrderData";
function StockManagement() {
  const [productNameValue, setProductNameValue] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const { addProduct } = useContext(ProductContext);
  const productNameChangeHandler = (event) => {
    setProductNameValue(event.target.value);
  };
  const productQuantityChangeHandler = (event) => {
    setProductQuantity(event.target.value);
  };
  const productPriceChangeHandler = (event) => {
    setProductPrice(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = {
      productName: productNameValue,
      productQuantity: parseFloat(productQuantity),
      productPrice: parseFloat(productPrice),
    };
    // Call the addProduct function from the context
    addProduct(products);
    addProductData(products);
    setProductNameValue("");
    setProductQuantity(0);
    setProductPrice(0);
  };

  const form = useForm({
    initialValues: {
      name: "",
      quantity: 0,
      price: 0,
    },

    // form validation
    validate: {
      name: isNotEmpty("Name cannot be empty"),
      quantity: isNotEmpty("Quantity cannot be empty"),
      price: isNotEmpty("Price cannot be empty"),
    },
  });
  return (
    <>
      <Text fz="xl" fw={700}>
        Add New Products
      </Text>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Product Name"
            placeholder="Add product name"
            {...form.getInputProps("name")}
            value={productNameValue}
            onChange={productNameChangeHandler}
          />

          <TextInput
            label="Product Price"
            placeholder="Add product price"
            {...form.getInputProps("price")}
            value={productPrice}
            onChange={productPriceChangeHandler}
          />
          <TextInput
            label="Product Quantity"
            placeholder="Add product quantity"
            {...form.getInputProps("quantity")}
            value={productQuantity}
            onChange={productQuantityChangeHandler}
          />
          <Group position="right" mt="md">
            <Button type="submit">Add Product</Button>
          </Group>
        </form>
      </Box>
    </>
  );
}

export default StockManagement;
