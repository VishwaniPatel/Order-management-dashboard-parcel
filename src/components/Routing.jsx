import React from "react";
import ProductManagement from "../pages/ProductManagement";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../pages/Registration";
import LoginForm from "../pages/Login";
import { MainSection } from "./Main";
import AddOrderForm from "./AddOrderForm";
import OrderHistroy from "./OrderHistroy";
import ProtectedRoute from "./ProtectedRoute";
import { PageNotFound } from "./PageNotFound";
import AppShellUI from "./AppShell";

const Routing = () => {
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
        <Route
          path="edit-order/:id"
          element={<ProtectedRoute Component={AddOrderForm} />}
        ></Route>
        <Route
          path="stock-management"
          element={<ProtectedRoute Component={ProductManagement} />}
        ></Route>
        <Route
          path="order-history"
          element={<ProtectedRoute Component={OrderHistroy} />}
        ></Route>
      </Route>

      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>

    //     <RouterProvider router={router}></RouterProvider>
  );
};

export default Routing;
