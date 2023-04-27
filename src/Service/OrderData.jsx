import axios from "axios";
const orders =
  "https://order-management-dashboard-default-rtdb.firebaseio.com/orders.json";

export const getOrderData = async () => {
  return await axios.get(`${orders}`);
};
export const deleteOrderData = async (id) => {
  return await axios.delete(
    `https://order-management-dashboard-default-rtdb.firebaseio.com/orders/${id}.json`
  );
};
export const addOrderData = async (order) => {
  return await axios.post(`${orders}`, { order });
};
