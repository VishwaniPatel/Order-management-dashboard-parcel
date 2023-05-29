import React from "react";
import { Flex, AppShell, Navbar, Header, ScrollArea } from "@mantine/core";
import { MainSection } from "./components/Main";
import { HeaderResponsive } from "./components/Header/Header";
import { NavbarSimple } from "./components/NavBar";
import AddOrderForm from "./components/AddOrderForm";
import RootLayout from "./pages/Root";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import ProductManagement from "./pages/ProductManagement";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./pages/Registration";
import LoginForm from "./pages/Login";
import OrderHistroy from "./components/OrderHistroy";
import { ProductProvider } from "./components/ProductContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { PageNotFound } from "./components/PageNotFound";
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
  const path = useLocation();
  const hideComponentRoutes = ["/login", "/register", "*"];
  const hideComponent = hideComponentRoutes.includes(path.pathname);
  return (
    <ProductProvider>
      <AppShell
        padding="md"
        navbar={
          !hideComponent && (
            <Navbar width={{ base: 300 }} height={1700} p="xs">
              <NavbarSimple />
            </Navbar>
          )
        }
        header={
          !hideComponent && (
            <Header height={60}>
              <HeaderResponsive />
            </Header>
          )
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
        <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
          <Routes>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route
              path="/"
              element={<ProtectedRoute Component={MainSection} />}
            ></Route>
            <Route
              path="/order-form"
              element={<ProtectedRoute Component={AddOrderForm} />}
            ></Route>
            <Route
              path="/edit-order/:id"
              element={<ProtectedRoute Component={AddOrderForm} />}
            ></Route>
            <Route
              path="/stock-management"
              element={<ProtectedRoute Component={ProductManagement} />}
            ></Route>
            <Route
              path="/order-history"
              element={<ProtectedRoute Component={OrderHistroy} />}
            ></Route>
            <Route
              path="/login"
              element={<ProtectedRoute Component={LoginForm} />}
            ></Route>
            <Route path="/register" element={<RegistrationForm />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
            {/* <Route path="/company-form" element={<ProductManagement />}>
          <Route path="add" element={<CompanyForm />}></Route>
          <Route path="edit/:id" element={<CompanyForm />}></Route>
        </Route> */}
          </Routes>
        </Navbar.Section>
      </AppShell>
      {/* // <>
    //   <HeaderResponsive />
    //   <Flex>
    //     <NavbarSimple />
    //     <RouterProvider router={router}></RouterProvider>
    //   </Flex>
    // </>
    // </AppShell> */}
    </ProductProvider>
  );
}

export default App;
