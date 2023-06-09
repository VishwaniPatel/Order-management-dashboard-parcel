import React from "react";

import Routing from "./components/Routing";
import SessionTimeout from "./components/SessionTimeOut";
import { AuthProvider } from "./components/ProductContext";
function App() {
  return (
    <AuthProvider>
      <Routing />
      <SessionTimeout />
    </AuthProvider>
  );
}

export default App;
