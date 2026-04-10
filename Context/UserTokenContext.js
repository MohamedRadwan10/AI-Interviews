"use client";
import { createContext, useState, useEffect, useMemo } from "react";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [deviceName, setDeviceName] = useState("Web App");

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedToken) setUserToken(savedToken);
    if (savedRefreshToken) setRefreshToken(savedRefreshToken);

    if (typeof window !== "undefined") {
      setDeviceName(navigator.userAgent.split(" ")[0] || "Web App");
    }
  }, []);

  const logout = () => {
    setUserToken(null);
    setRefreshToken(null);
    setUserData(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
  };

  const result = useMemo(() => {
    return {
      userToken,
      setUserToken,
      refreshToken,
      setRefreshToken,
      userData,
      setUserData,
      deviceName,
      logout,
    };
  });

  return (
    <UserTokenContext.Provider value={result}>
      {children}
    </UserTokenContext.Provider>
  );
};
