import React, { useEffect, useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  useEffect(() => {
    handleSearchChange();
  }, [searchQuery]);
  const handleSearchChange = (event) => {
    const value = event?.target?.value?.toLowerCase();
    const filteredData = value.filter(
      (item) =>
        item.status?.toLowerCase().includes(value) ||
        item.userName.toLowerCase().includes(value)
    );
    setSearchQuery(filteredData);
    // setFilterData(filteredData);
  };
  return searchQuery;
};

export default useSearch;
