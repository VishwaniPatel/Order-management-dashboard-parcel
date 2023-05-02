import React from "react";
import { Menu, Button, Text } from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

function FilterOrderData(props) {
  const onFilter = (id) => (event) => {
    event.stopPropagation();
    props.onDataReceived(id);
  };
  return (
    <Menu shadow="md" width={150} position="bottom-end">
      <Menu.Target>
        <Button>Filter</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={onFilter(0)}>All Orders</Menu.Item>
        <Menu.Item onClick={onFilter(1)}>Pending</Menu.Item>
        <Menu.Item onClick={onFilter(2)}>Dispatch</Menu.Item>
        <Menu.Item onClick={onFilter(3)}>Completed</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default FilterOrderData;
