import React from "react";
import { ProductProvider } from "./components/ProductContext";
import AppShell from "./components/AppShell";
// import LoginForm from "./pages/Login";
import AddOrderForm from "./components/AddOrderForm";
import Routing from "./components/Routing";
function App() {
  return (
    <ProductProvider>
      {/* <LoginForm /> */}
      {/* <AddOrderForm /> */}
      <Routing />
    </ProductProvider>
  );
}

export default App;
