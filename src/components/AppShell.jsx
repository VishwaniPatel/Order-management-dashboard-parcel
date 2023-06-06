import React from "react";
import { AppShell, Navbar, Header, ScrollArea } from "@mantine/core";
import { HeaderResponsive } from "./Header/Header";
import { NavbarSimple } from "./NavBar";
import Routing from "./Routing";
import { Outlet } from "react-router-dom";
const AppShellUI = () => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={1700} p="xs">
          <NavbarSimple />
        </Navbar>
      }
      header={
        <Header height={60}>
          <HeaderResponsive />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs"> */}
      <Outlet />
      {/* </Navbar.Section> */}
    </AppShell>
  );
};

export default AppShellUI;
