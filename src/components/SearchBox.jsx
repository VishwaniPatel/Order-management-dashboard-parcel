import { TextInput } from "@mantine/core";
import React from "react";

const SearchBox = ({ onSearch }) => {
  // const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };
  return (
    <TextInput
      placeholder="Search here"
      // value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBox;
