import { createStyles, Badge, Container, rem, Table } from "@mantine/core";
import { useState, useEffect } from "react";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons-react";
import { getOrderData } from "../Service/OrderData.jsx";

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
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    const response = await getOrderData();
    console.log(response);
    return setOrderData(response.data);
  };

  const { classes, theme } = useStyles();
  const orders = orderData.map((data) => (
    <tr key={data.id}>
      <td>{data.id}</td>
      <td>{data.userName}</td>
      <td>
        {data.dateNtime.year}-{data.dateNtime.month}-{data.dateNtime.day}
      </td>
      <td>{data.price}</td>
      <td>
        <Badge>{data.status}</Badge>
      </td>
    </tr>
  ));

  return (
    <Container size="lg" py="xl">
      <Table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Date and time</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </Table>
    </Container>
  );
}
