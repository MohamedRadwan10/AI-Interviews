"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";

export const useForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEmailSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const emailValue = values.email;
      setEmail(emailValue);
      const config = AUTH_ENDPOINTS.forgetPassword;
      await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        data: { email: emailValue }, 
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (codeValue) => {
    const code = codeValue || otp;
    if (code.length !== 6) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const config = AUTH_ENDPOINTS.sendOTP;
      const response = await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        data: { email, code },
      });
      setToken(response.data?.token || response.data?.data?.token || code);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const config = AUTH_ENDPOINTS.resetPassword;
      await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        data: {
          email,
          token: token || otp,
          newPassword: values.password,
          confirmPassword: values.confirmPassword,
        },
      });
      router.push("/login?success=true");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    if (value.length === 6) {
      handleOTPSubmit(value);
    }
  };

  return {
    step,
    email,
    otp,
    isLoading,
    error,
    handleEmailSubmit,
    handleOTPSubmit,
    handlePasswordSubmit,
    handleOtpChange,
    setStep,
  };
};
