"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserTokenContext } from "@/Context/UserTokenContext";

export const useAuth = () => {
  const context = useContext(UserTokenContext);

  if (!context) {
    return {
      register: async () => {
        console.warn("Context not available during prerender");
      },
      login: async () => {
        console.warn("Context not available during prerender");
      },
      logout: () => {},
      errors: null,
      isLoading: false,
    };
  }
  
  const { setUserToken, setUserData, logout } = context;
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (values, type = "candidate") => {
    setIsLoading(true);
    setErrors(null);

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values,
      );

      if (data) {
        setIsLoading(false);
        router.push("/login");
      }
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response?.data?.message || "Something went wrong");
    }
  };

  const login = async (values) => {
    setIsLoading(true);
    setErrors(null);

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values,
      );

      if (data) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUserToken(data.token);
        setUserData(data.user);
        setIsLoading(false);
        router.push("/intelliHire");
      }
    } catch (err) {
      setIsLoading(false);
      setErrors(err.response?.data?.message || "Login failed");
    }
  };

  return {
    register,
    login,
    logout,
    errors,
    isLoading,
  };
};
