import React, { useState, useMemo, useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { Table, Text, Group, ActionIcon, Skeleton } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import useProductData from "../hook/useProductData";
import { getProductData, updateProductQuantity } from "../Service/OrderData";
function GetProductData() {
  // const { decrementStock, incrementStock } = useContext(ProductContext);
  const product = useProductData();

  const [products, setProducts] = useState(product);
  console.log(products);
  const [loading, setLoading] = useState(true);
  const totalStock = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.productQuantity,
      0
    );
  }, [products]);
  const decrementStock = async (productId) => {
    try {
      // Find the product in the products array
      const product = products.find((product) => product.id === productId);

      if (product) {
        // Decrease the quantity by 1
        const newQuantity = product.productQuantity - 1;

        // Make the API request to update the quantity
        updateProductQuantity(productId, newQuantity);

        // Update the product in the products array with the new quantity
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, productQuantity: newQuantity } : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to decrement stock", error);
    }
  };

  const incrementStock = async (productId) => {
    try {
      // Find the product in the products array
      const product = products.find((product) => product.id === productId);

      if (product) {
        // Increase the quantity by 1
        const newQuantity = product.productQuantity + 1;

        // Make the API request to update the quantity
        updateProductQuantity(productId, newQuantity);

        // Update the product in the products array with the new quantity
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, productQuantity: newQuantity } : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to increment stock", error);
    }
  };
  const productData = products?.map((product, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{product.productName}</td>
      <td>{product.productPrice}</td>
      <td>{product.productQuantity}</td>
      <td>
        <Group>
          <ActionIcon variant="filled" color="red">
            <IconMinus onClick={() => decrementStock(product.id)} />
          </ActionIcon>
          <ActionIcon variant="filled" color="green">
            <IconPlus onClick={() => incrementStock(product.id)} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));
  useEffect(() => {
    setProducts(product);
  }, [product]);
  useEffect(() => {
    // Simulating fetching data from the database
    setTimeout(() => {
      // Assuming `products` is fetched and available here
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton height={20} mt={6} width="100%" radius="xl" />
        <Skeleton height={20} mt={6} width="100%" radius="xl" />
        <Skeleton height={20} mt={6} width="100%" radius="xl" />
      </>
    );
  }
  if (products.length === 0) {
    return <Text>No products available.</Text>;
  }
  return (
    <>
      <Text fz="xl" fw={700}>
        Available Stock
      </Text>
      <Text>Total Stock: {totalStock}</Text>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{productData}</tbody>
      </Table>
    </>
  );
}

export default GetProductData;
