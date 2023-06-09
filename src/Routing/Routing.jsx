import React from "react";
import ProductManagement from "../pages/ProductManagement";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../pages/Registration";
import LoginForm from "../pages/Login";
import { MainSection } from "../components/Main";
import AddOrderForm from "../components/AddOrderForm";
import OrderHistroy from "../components/OrderHistroy";
import ProtectedRoute from "../components/ProtectedRoute";
import { PageNotFound } from "../components/PageNotFound";
import AppShellUI from "../components/AppShell";

const RoutingPaths = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/register" element={<RegistrationForm />}></Route>
      <Route path="/order/*" element={<AppShellUI />}>
        <Route
          path="dashboard"
          // element={<ProtectedRoute Component={MainSection} />}
          element={<MainSection />}
        ></Route>
        <Route
          path="order-form"
          // element={<ProtectedRoute Component={AddOrderForm} />}
          element={<AddOrderForm />}
        ></Route>
        <Route path="edit-order/:id" element={<AddOrderForm />}></Route>
        <Route path="stock-management" element={<ProductManagement />}></Route>
        <Route path="order-history" element={<OrderHistroy />}></Route>
      </Route>

      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>

    //     <RouterProvider router={router}></RouterProvider>
  );
};

export default RoutingPaths;
