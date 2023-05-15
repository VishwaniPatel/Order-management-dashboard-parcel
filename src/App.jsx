import React from "react";
import { Flex, AppShell, Navbar, Header } from "@mantine/core";
import { MainSection } from "./components/Main";
import { HeaderResponsive } from "./components/Header/Header";
import { NavbarSimple } from "./components/NavBar";
import AddOrderForm from "./components/AddOrderForm";
import RootLayout from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductManagement from "./pages/ProductManagement";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/Registration";
import LoginForm from "./pages/Login";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         path: "/",
//         element: <MainSection />,
//       },
//       {
//         path: "/order-form",
//         element: <AddOrderForm />,
//       },
//       {
//         path: "/edit-order/:id",
//         element: <AddOrderForm />,
//       },
//       {
//         path: "/stock-management",
//         element: <ProductManagement />,
//       },
//       {
//         path: "/registration",
//         element: <RegistrationForm />,
//       },
//       {
//         path: "/login",
//         element: <LoginForm />,
//       },
//     ],
//   },
// ]);
function App() {
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
      <Routes>
        <Route path="/" element={<MainSection />}></Route>
        <Route path="/dashboard" element={<MainSection />}></Route>
        <Route path="/order-form" element={<AddOrderForm />}></Route>
        <Route path="/edit-order/:id" element={<AddOrderForm />}></Route>
        <Route path="/stock-management" element={<ProductManagement />}></Route>
        {/* <Route path="/company-form" element={<ProductManagement />}>
          <Route path="add" element={<CompanyForm />}></Route>
          <Route path="edit/:id" element={<CompanyForm />}></Route>
        </Route> */}
      </Routes>
    </AppShell>
    // <>
    //   <HeaderResponsive />
    //   <Flex>
    //     <NavbarSimple />
    //     <RouterProvider router={router}></RouterProvider>
    //   </Flex>
    // </>
    // </AppShell>
  );
}

export default App;
