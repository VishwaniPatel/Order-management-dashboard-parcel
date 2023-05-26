import axios from "axios";

const orders =
  "https://order-management-dashboard-default-rtdb.firebaseio.com/orders.json";

const products =
  "https://order-management-dashboard-default-rtdb.firebaseio.com/products.json";

const users =
  "https://order-management-dashboard-default-rtdb.firebaseio.com/users.json";

// to get order details
export const getOrderData = async () => {
  return await axios.get(`${orders}`);
};

// to delete selected order detail
export const deleteOrderData = async (id) => {
  return await axios.delete(
    `https://order-management-dashboard-default-rtdb.firebaseio.com/orders/${id}.json`
  );
};

// to add order detail
export const addOrderData = async (order) => {
  return await axios.post(`${orders}`, order);
};

// to get order details by id
export const getOrderById = async (id) => {
  return await axios.get(
    `https://order-management-dashboard-default-rtdb.firebaseio.com/orders/${id}.json`
  );
};

// to update order detail
export const patchOrderData = async (id, order) => {
  return await axios.put(
    `https://order-management-dashboard-default-rtdb.firebaseio.com/orders/${id}.json`,
    order
  );
};

// to get product details
export const getProductData = async () => {
  return await axios.get(`${products}`);
};

// to add product detail
export const addProductData = async (product) => {
  return await axios.post(`${products}`, product);
};

// to update order detail
export const updateProductQuantity = async (productId, data) => {
  return await axios.put(
    `https://order-management-dashboard-default-rtdb.firebaseio.com/products/${productId}/productQuantity.json`,
    data
  );
};

// to get user details
export const getUserData = async () => {
  return await axios.get(`${users}`);
};

// to add user detail
export const addUserData = async (user) => {
  return await axios.post(`${users}`, user);
};
