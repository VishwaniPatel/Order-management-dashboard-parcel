import { useState } from "react";
import {
  createStyles,
  Navbar,
  Text,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  IconSettings,
  IconLayoutDashboard,
  IconShoppingCartPlus,
  IconHistory,
  IconMessage,
  IconBuildingStore,
} from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
    "&:active": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

export function NavbarSimple() {
  const { classes } = useStyles();

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <NavLink to="dashboard" className={classes.link}>
          <IconLayoutDashboard />
          <Text pl={10}>Live Orders</Text>
        </NavLink>
        <NavLink to="order-form" className={classes.link}>
          <IconShoppingCartPlus />
          <Text pl={10}>Add New Order</Text>
        </NavLink>
        <NavLink to=" order-history" className={classes.link}>
          <IconHistory />
          <Text pl={10}>Order History</Text>
        </NavLink>
        <NavLink to="stock-management" className={classes.link}>
          <IconBuildingStore />
          <Text pl={10}>Available Stock</Text>
        </NavLink>
        <NavLink className={classes.link}>
          <IconSettings />
          <Text pl={10}>Settings</Text>
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
}
