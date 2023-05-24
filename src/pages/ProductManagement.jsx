import { Container } from "@mantine/core";
import React from "react";
import StockManagement from "../components/StockManagement";
import GetProductData from "../components/GetProductData";
import { ProductProvider } from "../components/ProductContext";
function ProductManagement() {
  return (
    <>
      <GetProductData />
      <StockManagement />
    </>
  );
}

export default ProductManagement;
