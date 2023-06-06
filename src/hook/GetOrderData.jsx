import React, { useEffect, useState } from "react";
import { getOrderData } from "../Service/OrderData";
const useOrderData = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    const orders = [];
    await getOrderData().then(async (res) => {
      const response = res.data;
      for (const key in response) {
        if (response[key]) {
          const date = new Date(response[key].dateNtime);

          const formattedDate = new Intl.DateTimeFormat(["ban", "id"]).format(
            date
          );

          const data = {
            id: key,
            userName: response[key].userName,
            profileImage: response[key].profileImage,
            dateNtime: formattedDate,
            price: response[key].price,
            status: response[key].status,
          };
          orders.push(data);
        }
      }
    });
    setOrderData(orders);
  };
  return orderData;
};

export default useOrderData;
