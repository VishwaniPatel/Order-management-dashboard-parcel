import { useState, useEffect } from "react";

const useFilterData = (orderData) => {
  const [filterData, setFilterData] = useState(orderData);

  useEffect(() => {
    setFilterData(orderData);
  }, [orderData]);

  const filterOrders = (id) => {
    if (id === 0) {
      setFilterData(orderData);
    } else if (id === 1) {
      const filteredData = orderData.filter((res) => res.status === "Pending");
      setFilterData(filteredData);
    } else if (id === 2) {
      const filteredData = orderData.filter((res) => res.status === "Dispatch");
      setFilterData(filteredData);
    } else if (id === 3) {
      const filteredData = orderData.filter(
        (res) => res.status === "Completed"
      );
      setFilterData(filteredData);
    }
  };

  return { filterData, filterOrders };
};

export default useFilterData;
