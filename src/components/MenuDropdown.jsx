import { Menu, Modal, Group, Button } from "@mantine/core";
import { Link } from "react-router-dom";

import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconEdit } from "@tabler/icons-react";
function MenuDropdown(props) {
  const [opened, { open, close }] = useDisclosure(false);
  const deleteOrder = (id) => {
    props.onDataReceived(id);
  };
  const id = props.data.id;
  return (
    <Menu.Dropdown>
      <Link to={"/edit-order/" + id}>
        <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
      </Link>
      <Modal
        opened={opened}
        onClose={close}
        title="Are Your Sure you want to delete?"
        centered
      >
        <Group position="center">
          <Button onClick={() => deleteOrder(id)} title="Title">
            Delete
          </Button>
          <Button onClick={close} color="gray" title="Title">
            Cancel
          </Button>
        </Group>
      </Modal>
      <Group position="center">
        <Menu.Item
          icon={<IconTrash size={14} />}
          onClick={open}
          title="Title"
          // onClick={deleteOrder.bind(null, data.id)}
        >
          Delete
        </Menu.Item>
      </Group>
    </Menu.Dropdown>
  );
}

export default MenuDropdown;
