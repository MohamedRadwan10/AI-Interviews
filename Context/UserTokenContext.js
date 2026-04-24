"use client";
import { createContext, useState, useEffect, useMemo } from "react";

export const UserTokenContext = createContext();

export const UserTokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [deviceName, setDeviceName] = useState("web");

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedToken) setUserToken(savedToken);
    if (savedRefreshToken) setRefreshToken(savedRefreshToken);

    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (e) {
        console.error("Failed to parse userData:", e);
      }
    }

    const handleSync = (e) => {
      const { newToken, newRefreshToken } = e.detail;
      if (newToken) setUserToken(newToken);
      if (newRefreshToken) setRefreshToken(newRefreshToken);
    };

    window.addEventListener("tokenRefreshed", handleSync);
    return () => window.removeEventListener("tokenRefreshed", handleSync);
  }, []);

  const logout = () => {
    setUserToken(null);
    setRefreshToken(null);
    setUserData(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
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
