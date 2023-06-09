import React from "react";

import SessionTimeout from "./components/SessionTimeOut";
import { AuthProvider } from "./context/ProductContext";
import RoutingPaths from "./Routing/Routing";
function App() {
  return (
    <AuthProvider>
      <RoutingPaths />
      <SessionTimeout />
    </AuthProvider>
  );
}

export default App;
