import React from "react";
import { AppShell } from "@mantine/core";
import { MainSection } from "./components/Main";
import { HeaderResponsive } from "./components/Header/Header";
import { NavbarSimple } from "./components/NavBar";
import AddOrderForm from "./components/AddOrderForm";
import RootLayout from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainSection />,
      },
      {
        path: "/order-form",
        element: <AddOrderForm />,
      },
      {
        path: "/edit-order/:id",
        element: <AddOrderForm />,
      },
    ],
  },
]);
function App() {
  return (
    <AppShell
      fixed
      navbar={<NavbarSimple />}
      header={<HeaderResponsive />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <RouterProvider router={router}></RouterProvider>
    </AppShell>
  );
}

export default App;
