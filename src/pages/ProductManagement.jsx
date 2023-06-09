import React from "react";
import StockManagement from "../components/StockManagement";
import GetProductData from "../components/GetProductData";
function ProductManagement() {
  return (
    <>
      <GetProductData />
      <StockManagement />
    </>
  );
}

export default ProductManagement;
