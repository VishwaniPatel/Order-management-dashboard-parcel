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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect, useCallback } from "react";
import {
  IconDotsVertical,
  IconTrash,
  IconShoppingBag,
} from "@tabler/icons-react";
import {
  getOrderData,
  deleteOrderData,
  getOrderById,
} from "../Service/OrderData.jsx";
import { IconEdit } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
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
  const [dataLength, setDataLength] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    setDataLength(orderData.length);
  }, []);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    const orders = [];
    const response = await getOrderData().then(async (res) => {
      const response = res.data;

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
  };

  const deleteOrder = async (id) => {
    console.log(id);
    await deleteOrderData(id);

    getOrder();
    setOrderData((orderData) => orderData.filter((data) => data.id !== id));
  };

  const orders = orderData?.map((data, index) => (
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
          <Menu.Dropdown>
            <Link to={"/edit-order/" + data.id}>
              <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
            </Link>
            <Modal
              opened={opened}
              onClose={close}
              title="Are Your Sure you want to delete?"
              centered
            >
              <Group position="center">
                <Button onClick={() => deleteOrder(data.id)} title="Title">
                  Delete
                </Button>
                <Button onClick={close} color="gray" title="Title">
                  Cancel
                </Button>
              </Group>
            </Modal>
            <Group position="center">
              <Menu.Item
                icon={<IconTrash size={14} />}
                onClick={open}
                title="Title"
                // onClick={deleteOrder.bind(null, data.id)}
              >
                Delete
              </Menu.Item>
            </Group>
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
