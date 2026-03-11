"use client";
import { createContext, useState } from "react";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const logout = () => {
    setUserToken(null);
    setUserData(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  return (
    <UserTokenContext.Provider
      value={{ userToken, setUserToken, userData, setUserData, logout }}
    >
      {children}
    </UserTokenContext.Provider>
  );
};