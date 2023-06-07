import React from "react";
import { Menu, Button } from "@mantine/core";

function FilterOrderData(props) {
  const handleSelect = (id) => (event) => {
    event.stopPropagation();
    props.onDataReceived(id);
  };

  const options = [
    { id: 0, label: "All Orders" },
    { id: 1, label: "Pending" },
    { id: 2, label: "Dispatch" },
    { id: 3, label: "Completed" },
  ];

  return (
    <Menu shadow="md" width={150} position="bottom-end">
      <Menu.Target>
        <Button>Filter</Button>
      </Menu.Target>

      <Menu.Dropdown onSelect={handleSelect}>
        {options.map((option) => (
          <Menu.Item key={option.id} onClick={handleSelect(option.id)}>
            {option.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default FilterOrderData;
