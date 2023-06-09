import {
  createStyles,
  Badge,
  Container,
  rem,
  Card,
  Table,
  Menu,
  Text,
  Group,
  Image,
  Flex,
  Input,
  Grid,
  Space,
  ScrollArea,
  TextInput,
} from "@mantine/core";
// import { BehaviorSubject } from "rxjs";
import { useState, useEffect, useContext } from "react";
import {
  IconDotsVertical,
  IconReport,
  IconShoppingBag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { deleteOrderData } from "../Service/OrderData.jsx";
// import { ProductContext } from "./ProductContext.js";
import MenuDropdown from "./MenuDropdown.jsx";
import FilterOrderData from "./FilterOrderData.jsx";
import useOrderData from "../hook/GetOrderData.jsx";
import useSearch from "../hook/useSearch.jsx";
import SearchBox from "./SearchBox.jsx";

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

// export const dataLengthSubject = new BehaviorSubject(0);
export function MainSection() {
  const { classes, theme } = useStyles();
  // const { pendingDataLength, dispatchDataLength } = useContext(ProductContext);
  const order = useOrderData();
  const [orderData, setOrderData] = useState(order);
  const [filterData, setFilterData] = useState(orderData);
  const [dataLength, setDataLength] = useState(0);
  const [pendingDataLength, setPendingDataLength] = useState(0);
  const [dispatchDataLength, setDispatchDataLength] = useState(0);
  // const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (search) => {
    const filterSearchData = useSearch(orderData, search);
    setFilterData(filterSearchData);
  };
  // delete selected order data
  const handleDataReceived = async (id) => {
    await deleteOrderData(id);
    // Update the orderData state if necessary
    setOrderData((prevOrderData) =>
      prevOrderData.filter((data) => data.id !== id)
    );
  };

  /**
   * filter data according to function
   * @param {status id} id
   */
  const onFilterData = (id) => {
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
  // filter data according to status
  const pendingOrders = orderData.filter((res) => {
    return res.status == "Pending";
  });
  const dispatchOrders = orderData.filter((res) => {
    return res.status == "Dispatch";
  });
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
    setOrderData(order);
  }, [order]);
  useEffect(() => {
    setFilterData(orderData);
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
          <SearchBox onSearch={handleSearch} />
          <FilterOrderData onDataReceived={onFilterData} />
        </Group>
      </Flex>
      <Space h="lg" />
      <Table striped highlightOnHover component={ScrollArea}>
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
