import React, { useEffect, useState } from "react";
import { getProductData } from "../Service/OrderData";
const useProductData = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
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
  return products;
};

export default useProductData;
