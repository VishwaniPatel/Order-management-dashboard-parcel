import React from "react";
import { AppShell, Navbar, Header } from "@mantine/core";
import Main, { FeaturesCards } from "./components/Main";
import { HeaderResponsive } from "./components/Header/Header";
import { NavbarSimple } from "./components/NavBar";
const links = [
  {
    link: "/about",
    label: "Features",
  },
  {
    link: "/pricing",
    label: "Pricing",
  },
  {
    link: "/learn",
    label: "Learn",
  },
  {
    link: "/community",
    label: "Community",
  },
];
function App() {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      header={<HeaderResponsive links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <FeaturesCards />
      {/* Your application here */}
    </AppShell>
  );
}

export default App;
