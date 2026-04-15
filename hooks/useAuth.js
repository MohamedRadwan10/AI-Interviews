"use client";
import { useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";
import { set, get } from "lodash-es";

export const useAuth = () => {
  const { 
    setUserToken, 
    setRefreshToken, 
    setUserData, 
    logout: logoutContext, 
    deviceName,
    userData,
    userToken
  } = useContext(UserTokenContext);

  const getUserProfile = useCallback(async () => {
    const config = AUTH_ENDPOINTS.userData;
    const token = userToken || localStorage.getItem("userToken");
    if (!token) return;

    try {
      const response = await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("User Data from API (/User/profile):", response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch user profile from API:", err.response?.data || err.message);
    }
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      getUserProfile();
    }
  }, [userToken, getUserProfile]);

  
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const performAuth = useCallback(async (type, values) => {
    setIsLoading(true);
    setErrors(null);

    const config = AUTH_ENDPOINTS[type];
    if (!config) {
      setIsLoading(false);
      setErrors(`Invalid auth type: ${type}`);
      return;
    }

    let payload = null;

    try {
      payload = { ...values, deviceName };
      
      if (type === "registerCompany") {
        const transformed = { ...payload };
        Object.keys(transformed).forEach(key => {
          if (key.includes('.')) {
            const value = transformed[key];
            set(transformed, key, value);
            delete transformed[key];
          }
        });
        payload = transformed;
      }

      const response = await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        data: payload,
      });

      const data = response.data;
      console.log("API Response Data:", data);


      if (data) {
        if (type === "login" || type.startsWith("register")) {
          const token = data.accessToken || data.token;
          const refresh = data.refreshToken;
          const user = data.user || data;

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

          setIsLoading(false);
          
          if (type === "login") {
             router.push("/intelliHire");
          } else {
             router.push("/verify-email-request");
          }
          return data;
        }

        if (type === "logout") {
          logoutContext();
          setIsLoading(false);
          router.push("/login");
          return data;
        }
      }
      
      setIsLoading(false);
      return data;

    } catch (err) {
      setIsLoading(false);
      console.error("Auth Error Payload:", payload);
      console.error("Auth Error Response:", err.response?.data);

      let errorMessage = "Authentication failed";
      
      const data = err.response?.data;
      if (data) {
        if (data.message) {
          errorMessage = data.message;
        } else if (data.errors) {
          errorMessage = Object.values(data.errors).flat().join(" | ");
        } else if (typeof data === "string") {
          errorMessage = data;
        }
      } else {
        errorMessage = err.message || "Network error";
      }

      setErrors(errorMessage);
      throw err;
    }
  }, [deviceName, logoutContext, router, setRefreshToken, setUserData, setUserToken]);

  const login = (values) => performAuth("login", values);
  const registerCandidate = (values) => performAuth("registerCandidate", values);
  const registerCompany = (values) => performAuth("registerCompany", values);
  const logout = () => {
    const refresh = localStorage.getItem("refreshToken");
    return performAuth("logout", { refreshToken: refresh });
  };

  return {
    performAuth,
    login,
    registerCandidate,
    registerCompany,
    logout,
    getUserProfile,
    errors,
    isLoading,
    userData,
  };
};

