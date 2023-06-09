import React, { createContext, useState, useEffect, useContext } from "react";
export const AuthContext = createContext([]);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
  });
  const initUser = () => {
    console.log(authState);
    if (localStorage.getItem("isAuthenticated")) {
      setAuthState((prevState) => ({
        ...prevState,

        isAuthenticated: true,
      }));
    }
  };
  useEffect(() => {
    initUser();
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
