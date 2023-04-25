import axios from "axios";
const orders =
  "https://order-management-dashboard-default-rtdb.firebaseio.com/orders.json";

export const getOrderData = async () => {
  return await axios.get(`${orders}`);
};
