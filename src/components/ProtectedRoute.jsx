import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const login = localStorage.getItem("isAuthenticated");
  console.log(Component);
  console.log(login);
  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  });
  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
