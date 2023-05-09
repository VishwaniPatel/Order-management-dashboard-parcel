import React, { createContext, useState, useEffect } from "react";
import { getProductData, updateProductQuantity } from "../Service/OrderData";
import axios from "axios";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const decrementStock = async (productId) => {
    // setProducts((prevProducts) => {
    //   return prevProducts.map((product) => {

    //     if (product.id === productId) {
    //       return { ...product, productQuantity: product.productQuantity - 1 };
    //     }
    //     return product;
    //   });
    // });
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

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        decrementStock,
        incrementStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
