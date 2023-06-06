import React, { useEffect, useState, useContext } from "react";
import {
  IconReport,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { Container, rem, Card, Text, Grid, Space } from "@mantine/core";
import { ProductContext } from "./ProductContext";
import useOrderData from "../hook/GetOrderData";

const OrderHistory = () => {
  const orderData = useOrderData();
  // const { orderData, pendingDataLength, dispatchDataLength } =
  //   useContext(ProductContext);
  const dataLength = orderData.length;

  //  const pendingOrders = orderData.filter((res) => {
  //   return res.status == "Pending";
  // });
  // const dispatchOrders = orderData.filter((res) => {
  //   return res.status == "Dispatch";
  // });
  return (
    <Container>
      <Grid grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={4}>
          <Card shadow="md" radius="md" padding="xl">
            <IconShoppingBag size={rem(50)} stroke={2} color="#258ee2" />
            <Text fz="lg" fw={500} mt="md">
              Total Orders
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              {dataLength}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="md" radius="md" padding="xl">
            <IconReport size={rem(50)} stroke={2} color="#258ee2" />
            <Text fz="lg" fw={500} mt="md">
              Total Pending Orders
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              {/* {pendingDataLength} */}
              {dataLength}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="md" radius="md" padding="xl">
            <IconTruckDelivery size={rem(50)} stroke={2} color="#258ee2" />
            <Text fz="lg" fw={500} mt="md">
              Total Dispatch Orders
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              {/* {dispatchDataLength} */}
              {dataLength}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default OrderHistory;
