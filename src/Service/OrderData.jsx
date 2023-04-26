import axios from "axios";
const orders =
  "https://order-management-dashboard-default-rtdb.firebaseio.com/orders/orders.json";

export const getOrderData = async () => {
  return await axios.get(`${orders}`);
};
export const deleteOrderData = async (id) => {
  return await axios.delete(
    `https://order-management-dashboard-default-rtdb.firebaseio.com/orders/orders/${id}.json`
  );
};
