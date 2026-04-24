"use client";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";

export const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
  const { userToken } = useContext(UserTokenContext);
  
  const { data, loading, error, refetch } = useApi({
    type: "userData",
    autoFetch: !!userToken,
  });

  const value = useMemo(() => ({
    accountData: data,
    loading,
    error,
    refetch,
    userId: data?.id || data?.userId || "",
  }), [data, loading, error, refetch]);

  return (
    <UserAccountContext.Provider value={value}>
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccount = () => {
  const context = useContext(UserAccountContext);
  if (!context) {
    throw new Error("useUserAccount must be used within a UserAccountProvider");
  }
  return context;
};
