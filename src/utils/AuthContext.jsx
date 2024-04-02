"use client";
import { createContext, useContext, useLayoutEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthWrapper = ({ children }) => {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem("digiExcel_user")));
  }, []);

  

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
