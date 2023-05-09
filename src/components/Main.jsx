import {
  createStyles,
  Badge,
  Container,
  rem,
  Card,
  Table,
  Menu,
  Text,
  Modal,
  Group,
  Button,
  Image,
  Flex,
  Input,
  Grid,
  Space,
} from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import {
  IconDotsVertical,
  IconReport,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import {
  getOrderData,
  deleteOrderData,
  getOrderById,
} from "../Service/OrderData.jsx";
import MenuDropdown from "./MenuDropdown.jsx";
import FilterOrderData from "./FilterOrderData.jsx";

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

export function MainSection() {
  const { classes, theme } = useStyles();
  const [orderData, setOrderData] = useState([]);
  const [filterData, setFilterData] = useState();
  const [dataLength, setDataLength] = useState(0);
  const [pendingDataLength, setPendingDataLength] = useState(0);
  const [dispatchDataLength, setDispatchDataLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // filter data according to status
  const pendingOrders = orderData.filter((res) => {
    return res.status == "Pending";
  });
  const dispatchOrders = orderData.filter((res) => {
    return res.status == "Dispatch";
  });
  // get order details from database
  const getOrder = async () => {
    const orders = [];
    await getOrderData().then(async (res) => {
      const response = res.data;
      console.log(response);
      for (const key in response) {
        if (response[key]) {
          const data = {
            id: key,
            userName: response[key].userName,
            profileImage: response[key].profileImage,
            dateNtime: response[key].dateNtime,
            price: response[key].price,
            status: response[key].status,
          };
          orders.push(data);
        }
      }
    });
    setOrderData(orders);
    setFilterData(orders);
  };
  // const deleteOrder = async (id) => {
  //   await deleteOrderData(id);

  //   getOrder();
  //   setOrderData((orderData) => orderData.filter((data) => data.id !== id));
  // };

  // delete selected order data
  const handleDataReceived = async (id) => {
    await deleteOrderData(id);

    getOrder();
    setOrderData((orderData) => orderData.filter((data) => data.id !== id));
  };

  const handleSearchChange = (event) => {
    const value = event?.target?.value?.toLowerCase();
    console.log(value);
    setSearchQuery(value);
    const filteredData = filterData.filter(
      (item) =>
        item.status?.toLowerCase().includes(value) ||
        item.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterData(filteredData);
  };
  // const filteredList = orderData.filter(
  //   (item) => console.log(item)
  //   // item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  /**
   * filter data according to function
   * @param {status id} id
   */
  const onFilterData = (id) => {
    console.log(id);
    if (id === 0) {
      setFilterData(orderData);
    }
    if (id === 1) {
      const filteredData = orderData.filter((res) => {
        return res.status == "Pending";
      });
      setFilterData(filteredData);
    }
    if (id === 2) {
      const filteredData = orderData.filter((res) => {
        return res.status == "Dispatch";
      });
      setFilterData(filteredData);
    }
    if (id === 3) {
      const filteredData = orderData.filter((res) => {
        return res.status == "Completed";
      });
      setFilterData(filteredData);
    }
  };
  const orders = filterData?.map((data, index) => (
    <tr key={index}>
      <td>{index}</td>

      <td>
        <Group>
          <Image maw={40} radius="md" src={data.profileImage} alt="user" />
          <Text>{data?.userName}</Text>
        </Group>
      </td>
      <td>{data?.dateNtime}</td>
      <td>{data?.price}</td>
      <td>
        <Badge>{data?.status}</Badge>
      </td>
      <td>
        <Menu shadow="md" width={120} position="bottom-end">
          <Menu.Target>
            <IconDotsVertical />
          </Menu.Target>
          <MenuDropdown data={data} onDataReceived={handleDataReceived} />
        </Menu>
      </td>
    </tr>
  ));

  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    setDataLength(orderData.length);
  }, [orderData]);
  useEffect(() => {
    setDispatchDataLength(dispatchOrders.length);
  }, [dispatchOrders]);
  useEffect(() => {
    setPendingDataLength(pendingOrders.length);
  }, [pendingOrders]);

  return (
    <Container>
      <Grid grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={4}>
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
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="md" radius="md" className={classes.card} padding="xl">
            <IconReport
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
              Total Pending Orders
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              {pendingDataLength}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="md" radius="md" className={classes.card} padding="xl">
            <IconTruckDelivery
              size={rem(50)}
              stroke={2}
              color={theme.fn.primaryColor()}
            />
            <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
              Total Dispatch Orders
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              {dispatchDataLength}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <Flex justify="space-between">
        <Text fz="xl" fw={700}>
          Orders
        </Text>
        <Group>
          <Input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FilterOrderData onDataReceived={onFilterData} />
        </Group>
      </Flex>
      <Space h="lg" />
      <Table striped highlightOnHover>
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
