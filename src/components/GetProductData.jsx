import React, { useState, useMemo, useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { Table, Text, Group, ActionIcon, Skeleton } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import useProductData from "../hook/useProductData";

function GetProductData() {
  const { decrementStock, incrementStock } = useContext(ProductContext);
  const products = useProductData();
  const [loading, setLoading] = useState(true);
  const totalStock = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.productQuantity,
      0
    );
  }, [products]);

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
