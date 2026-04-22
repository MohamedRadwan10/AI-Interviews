"use client";
import { useContext, useCallback, useEffect, useMemo } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { set } from "lodash-es";
import { useNavigation } from "@/hooks/common";
import { useApi } from "./useApi";

export const useAuth = () => {
  const { navigateTo } = useNavigation();
  const { 
    setUserToken, 
    setRefreshToken, 
    setUserData, 
    logout: logoutContext, 
    deviceName,
    userData,
    userToken
  } = useContext(UserTokenContext);

  const loginApi = useApi({ type: "login", autoFetch: false });
  const registerCandidateApi = useApi({ type: "registerCandidate", autoFetch: false });
  const registerCompanyApi = useApi({ type: "registerCompany", autoFetch: false });
  const logoutApi = useApi({ type: "logout", autoFetch: false });
  const profileApi = useApi({ 
    type: "userData", 
    autoFetch: !!userToken || !!localStorage.getItem("refreshToken") 
  });

  useEffect(() => {
    if (profileApi.data) {
      setUserData(profileApi.data);
    }
  }, [profileApi.data, setUserData]);

  const performAuth = useCallback(async (type, values) => {
    let apiHook;
    switch (type) {
      case "login": apiHook = loginApi; break;
      case "registerCandidate": apiHook = registerCandidateApi; break;
      case "registerCompany": apiHook = registerCompanyApi; break;
      case "logout": apiHook = logoutApi; break;
      default: return null;
    }

    try {
      let payload = { ...values, deviceName };
      
      if (type === "registerCompany") {
        const transformed = { ...payload };
        Object.keys(transformed).forEach(key => {
          if (key.includes('.')) {
            set(transformed, key, transformed[key]);
            delete transformed[key];
          }
        });
        payload = transformed;
      }

      const data = await apiHook.refetch({ data: payload });

      if (data) {
        if (type === "login" || type.startsWith("register")) {
          const token = data.data?.token;
          const refresh = data.data?.refreshToken;
          const user = data.data

          if (token) {
            localStorage.setItem("userToken", token);
            setUserToken(token);
          }
          if (refresh) {
            localStorage.setItem("refreshToken", refresh);
            setRefreshToken(refresh);
          }
          if (user) {
            localStorage.setItem("userData", JSON.stringify(user));
            setUserData(user);
          }
          
          navigateTo(type === "login" ? "/intelliHire" : "/verify-email-request");
        }

        if (type === "logout") {
          navigateTo("/login");
          logoutContext();
        }
      }
      return data;
    } catch (err) {
      if (type === "logout") {
        navigateTo("/login");
        logoutContext();
      }
      throw err;
    }
  }, [deviceName, loginApi, registerCandidateApi, registerCompanyApi, logoutApi, setUserToken, setRefreshToken, setUserData, navigateTo, logoutContext]);

  const login = (values) => performAuth("login", values);
  const registerCandidate = (values) => performAuth("registerCandidate", values);
  const registerCompany = (values) => performAuth("registerCompany", values);
  const logout = useCallback(() => {
    const refresh = localStorage.getItem("refreshToken");
    performAuth("logout", { refreshToken: refresh });
  }, [performAuth]);

  const authLoading = loginApi.loading || registerCandidateApi.loading || registerCompanyApi.loading || logoutApi.loading || profileApi.loading;
  const authErrors = loginApi.error || registerCandidateApi.error || registerCompanyApi.error || logoutApi.error || profileApi.error;

  return useMemo(() => ({
    performAuth,
    login,
    registerCandidate,
    registerCompany,
    logout,
    getUserProfile: profileApi.refetch,
    errors: authErrors,
    isLoading: authLoading,
    userData,
    userToken
  }), [performAuth, login, registerCandidate, registerCompany, logout, profileApi.refetch, authErrors, authLoading, userData, userToken]);
};
