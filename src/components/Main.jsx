import {
  createStyles,
  Badge,
  Container,
  rem,
  Card,
  Table,
  Menu,
  Text,
} from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import {
  IconGauge,
  IconUser,
  IconCookie,
  IconDotsVertical,
  IconTrash,
  IconShoppingBag,
} from "@tabler/icons-react";
import { getOrderData, deleteOrderData } from "../Service/OrderData.jsx";
import ActionMenu from "./ActionMenu.jsx";
import { IconEdit } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const [orderData, setOrderData] = useState([]);
  const [dataLength, setDataLength] = useState();

  useEffect(() => {
    setDataLength(orderData.length);
    // console.log({ orderData });
  }, []);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    const orders = [];
    const response = await getOrderData().then(async (res) => {
      const response = res.data;

      for (const key in response) {
        const data = {
          id: key,
          userName: response[key].userName,
          price: response[key].price,
          status: response[key].status,
        };
        orders.push(data);
      }
    });
    // console.log(orders);
    setOrderData(orders);
  };

  const deleteOrder = async (id) => {
    console.log(id);
    await deleteOrderData(id);
    const updatedOrderData = orderData?.filter((data) => data?.id !== id);
    // console.log("After deletion", updatedOrderData);
    getOrder();
  };
  const totalOrder = orderData.length;
  const orders = orderData?.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{data?.userName}</td>
      <td>
        {data?.dateNtime?.year}-{data?.dateNtime?.month}-{data?.dateNtime?.day}
      </td>
      <td>{data?.price}</td>
      <td>
        <Badge>{data?.status}</Badge>
      </td>
      <td>
        <Menu shadow="md" width={120} position="bottom-end">
          <Menu.Target>
            <IconDotsVertical />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
            <Menu.Item
              icon={<IconTrash size={14} />}
              onClick={() => deleteOrder(data.id)}
              // onClick={deleteOrder.bind(null, data.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <Container size="lg" py="xl">
      <Card shadow="md" radius="md" className={classes.card} padding="xl">
        <IconShoppingBag
          size={rem(50)}
          stroke={2}
          color={theme.fn.primaryColor()}
        />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          Total Orders
        </Text>
        <Text fz="sm" c="dimmed" mt="sm">
          {dataLength}
        </Text>
      </Card>
      <Table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Date and time</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </Table>
    </Container>
  );
}
