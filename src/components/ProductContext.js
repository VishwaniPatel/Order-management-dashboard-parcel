import React, { createContext, useState, useEffect } from "react";
import { getProductData, updateProductQuantity } from "../Service/OrderData";
import axios from "axios";
export const ProductContext = createContext();
import { getOrderData } from "../Service/OrderData";
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [pendingDataLength, setPendingDataLength] = useState(0);
  const [dispatchDataLength, setDispatchDataLength] = useState(0);
  // filter data according to status
  const pendingOrders = orderData.filter((res) => {
    return res.status == "Pending";
  });
  const dispatchOrders = orderData.filter((res) => {
    return res.status == "Dispatch";
  });
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = [];
      await getProductData().then(async (res) => {
        const response = res.data;
        for (const key in response) {
          if (response[key]) {
            const data = {
              id: key,
              productName: response[key].productName,
              productQuantity: response[key].productQuantity,
              productPrice: response[key].productPrice,
            };
            fetchedProducts.push(data);
          }
        }
      });
      setProducts(fetchedProducts);
    };
    fetchData();
  }, []);
  // get order details from database
  const getOrder = async () => {
    const orders = [];
    await getOrderData().then(async (res) => {
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
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const decrementStock = async (productId) => {
    try {
      // Find the product in the products array
      const product = products.find((product) => product.id === productId);

      if (product) {
        // Decrease the quantity by 1
        const newQuantity = product.productQuantity - 1;

        // Make the API request to update the quantity
        updateProductQuantity(productId, newQuantity);

        // Update the product in the products array with the new quantity
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, productQuantity: newQuantity } : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to decrement stock", error);
    }
  };

  const incrementStock = async (productId) => {
    try {
      // Find the product in the products array
      const product = products.find((product) => product.id === productId);

      if (product) {
        // Increase the quantity by 1
        const newQuantity = product.productQuantity + 1;

        // Make the API request to update the quantity
        updateProductQuantity(productId, newQuantity);

        // Update the product in the products array with the new quantity
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, productQuantity: newQuantity } : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to increment stock", error);
    }
  };
  // useEffect(() => {
  //   setDataLength(orderData.length);
  // }, [orderData]);
  useEffect(() => {
    setDispatchDataLength(dispatchOrders.length);
  }, [dispatchOrders]);
  useEffect(() => {
    setPendingDataLength(pendingOrders.length);
  }, [pendingOrders]);
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        decrementStock,
        incrementStock,
        orderData,
        setOrderData,
        getOrder,
        pendingDataLength,
        dispatchDataLength,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
