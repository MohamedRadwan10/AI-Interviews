"use client";
import { useState, useCallback, useEffect, useMemo, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { set, get, keys, forEach } from "lodash-es";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation, useMainNotify } from "@/hooks/common";
import { useApi } from "@/hooks/useApi";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";

export const useAfterLogin = () => {
  const { navigateTo } = useNavigation();
  
  return useCallback((user) => {
    const isComplete = get(user, "isComplete") || get(user, "isCompleted");
    const userType = get(user, "userType");

    if (isComplete === true) {
      navigateTo("/intelliHire");
    } else {
      if (userType === "Individual") {
        navigateTo("/candidate-onboarding");
      } else if (userType === "Company") {
        navigateTo("/company-onboarding");
      } else {
        navigateTo("/intelliHire");
      }
    }
  }, [navigateTo]);
};

export const useLogin = () => {
  const { setUserToken, setRefreshToken, setUserData, deviceName } = useContext(UserTokenContext);
  const loginApi = useApi({ type: "login", autoFetch: false });
  const afterLogin = useAfterLogin();
  const { success, error: notifyError } = useMainNotify();
  
  const login = useCallback(async (values) => {
    try {
      const payload = { ...values, deviceName };
      const data = await loginApi.refetch({ data: payload });
      if (data) {
        const responseData = get(data, "data.data") || get(data, "data");
        const token = get(responseData, "token");
        const refresh = get(responseData, "refreshToken");
        const user = responseData;

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
        
        success("Login Successful", "Welcome back!");
        afterLogin(user);
      }
      return data;
    } catch (err) {
      notifyError("Login Failed", get(err, "response.data.message") || "Please check your credentials.");
      throw err;
    }
  }, [deviceName, loginApi, setUserToken, setRefreshToken, setUserData, afterLogin, success, notifyError]);

  return { login, isLoading: loginApi.loading, error: loginApi.error };
};

export const useRegister = () => {
  const { deviceName } = useContext(UserTokenContext);
  const { navigateTo } = useNavigation();
  const registerCandidateApi = useApi({ type: "registerCandidate", autoFetch: false });
  const registerCompanyApi = useApi({ type: "registerCompany", autoFetch: false });
  const { success, error: notifyError } = useMainNotify();

  const register = useCallback(async (type, values) => {
    const apiHook = type === "company" ? registerCompanyApi : registerCandidateApi;
    try {
      let payload = { ...values, deviceName };
      if (type === "company") {
        const transformed = { ...payload };
        forEach(keys(transformed), (key) => {
          if (key.includes('.')) {
            set(transformed, key, transformed[key]);
            delete transformed[key];
          }
        });
        payload = transformed;
      }
      console.log(`[useRegister] Registering ${type}:`, payload);
      const data = await apiHook.refetch({ data: payload });
      console.log(`[useRegister] Register Success:`, data);
      if (data) {
        success("Registration Successful", "Please check your email for verification.");
        navigateTo("/verify-email-request");
      }
      return data;
    } catch (err) {
      notifyError("Registration Failed", get(err, "response.data.message") || "An error occurred during registration.");
      throw err;
    }
  }, [deviceName, registerCandidateApi, registerCompanyApi, navigateTo, success, notifyError]);

  const registerCandidate = useCallback((values) => register("candidate", values), [register]);
  const registerCompany = useCallback((values) => register("company", values), [register]);

  const isLoading = registerCandidateApi.loading || registerCompanyApi.loading;
  const error = registerCandidateApi.error || registerCompanyApi.error;

  return { registerCandidate, registerCompany, isLoading, error };
};

export const useLogout = () => {
  const { navigateTo } = useNavigation();
  const { logout: logoutContext, deviceName } = useContext(UserTokenContext);
  const logoutApi = useApi({ type: "logout", autoFetch: false });
  const { success } = useMainNotify();

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (refreshToken) {
        await logoutApi.refetch({ 
          data: { 
            refreshToken,
            deviceName,
          } 
        });
      }
    } catch (err) {
      console.error("Logout API failed (Backend error), proceeding with local logout.");
    } finally {
      success("Logged Out", "You have been successfully logged out.");
      navigateTo("/login");
      logoutContext();
    }
  }, [logoutApi, navigateTo, logoutContext, deviceName, success]);

  return { logout, isLoading: logoutApi.loading, error: logoutApi.error };
};

export const useCompleteProfile = () => {
  const { navigateTo } = useNavigation();
  const completeUserApi = useApi({ type: "CompleteUserData", autoFetch: false });
  const completeCompanyApi = useApi({ type: "CompleteCompanyData", autoFetch: false });
  const { success, error: notifyError } = useMainNotify();

  const completeProfile = useCallback(async (role, values) => {
    const apiHook = role === "company" ? completeCompanyApi : completeUserApi;
    try {
      const formData = new FormData();
      forEach(keys(values), (key) => {
        const val = values[key];
        if (val !== undefined && val !== null) {
          if (key === "Locations") {
            forEach(keys(val), (locKey) => {
              formData.append(`Locations.${locKey}`, val[locKey]);
            });
          } else {
            formData.append(key, val);
          }
        }
      });
      const data = await apiHook.refetch({ data: formData });
      if (data) {
        success("Profile Updated", "Your profile has been successfully completed.");
        navigateTo("/intelliHire");
      }
      return data;
    } catch (err) {
      notifyError("Update Failed", get(err, "response.data.message") || "An error occurred while updating your profile.");
      throw err;
    }
  }, [completeUserApi, completeCompanyApi, navigateTo, success, notifyError]);

  return { 
    completeProfile, 
    isLoading: completeUserApi.loading || completeCompanyApi.loading, 
    error: completeUserApi.error || completeCompanyApi.error 
  };
};

export const useVerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const { setUserToken, setRefreshToken, setUserData } = useContext(UserTokenContext);
  const { success, error: notifyError } = useMainNotify();

  const userId = searchParams.get("userId") || searchParams.get("userid") || searchParams.get("uid");
  let token = searchParams.get("token") || searchParams.get("Token");

  if (token) {
    token = token.replace(/ /g, "+");
  }

  useEffect(() => {
    const confirmEmail = async () => {
      if (!userId || !token) {
        setStatus("error");
        return;
      }
      try {
        const config = AUTH_ENDPOINTS.verifyEmail;
        const response = await axios({
          method: config.method,
          url: `${API_BASE_URL}${config.url}`,
          params: { userId, token }
        });
        
        const responseData = get(response, "data.data") || get(response, "data");
        const resToken = get(responseData, "token");
        
        if (resToken) {
           localStorage.setItem("userToken", resToken);
           setUserToken(resToken);
           const resRefresh = get(responseData, "refreshToken");
           if (resRefresh) {
             localStorage.setItem("refreshToken", resRefresh);
             setRefreshToken(resRefresh);
           }
           localStorage.setItem("userData", JSON.stringify(responseData));
           setUserData(responseData);
        }
        
        success("Email Verified", "Your email has been successfully verified.");
        setStatus("success");
        
        setTimeout(() => {
          if (resToken) {
            if (get(responseData, "userType") === "Company") {
               router.push("/company-onboarding");
            } else {
               router.push("/candidate-onboarding");
            }
          } else {
            router.push("/login?verified=true");
          }
        }, 2000);
      } catch (err) {
        const msg = get(err, "response.data.message") || "Verification failed.";
        notifyError("Verification Error", msg);
        setStatus("error");
        setError(msg);
      }
    };
    confirmEmail();
  }, [userId, token, router, setRefreshToken, setUserData, setUserToken, success, notifyError]);

  return { status, error, userId, token };
};

export const useForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { navigateTo } = useNavigation();
  const { success, error: notifyError, info } = useMainNotify();

  const handleEmailSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const emailValue = get(values, "email");
      setEmail(emailValue);
      const config = AUTH_ENDPOINTS.forgetPassword;
      await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        data: { email: emailValue }, 
      });
      success("Reset Code Sent", "Please check your email for the verification code.");
      setStep(2);
    } catch (err) {
      const msg = get(err, "response.data.message") || "Failed to send reset code.";
      notifyError("Request Failed", msg);
      setError(msg);
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
      setToken(get(response, "data.token") || get(response, "data.data.token") || code);
      info("OTP Verified", "Code confirmed. You can now set your new password.");
      setStep(3);
    } catch (err) {
      const msg = get(err, "response.data.message") || "Invalid or expired code.";
      notifyError("OTP Error", msg);
      setError(msg);
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
          newPassword: get(values, "password"),
          confirmPassword: get(values, "confirmPassword"),
        },
      });
      success("Password Changed", "Your password has been successfully updated.");
      navigateTo("/login?success=true");
    } catch (err) {
      const msg = get(err, "response.data.message") || "Failed to reset password.";
      notifyError("Reset Failed", msg);
      setError(msg);
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
    step, email, otp, isLoading, error,
    handleEmailSubmit, handleOTPSubmit, handlePasswordSubmit, handleOtpChange, setStep,
  };
};

export const useProfileData = () => {
  const { setUserData, userToken } = useContext(UserTokenContext);
  const { pathname } = useNavigation();
  const isAuthFlow = pathname.includes("onboarding") || pathname.includes("verify") || pathname.includes("login") || pathname.includes("register");
  
  const profileApi = useApi({ 
    type: "userData", 
    autoFetch: (!!userToken || (typeof window !== "undefined" && !!localStorage.getItem("refreshToken"))) && !isAuthFlow 
  });

  useEffect(() => {
    if (profileApi.data) {
      setUserData(profileApi.data);
    }
  }, [profileApi.data, setUserData]);

  return {
    getUserProfile: profileApi.refetch,
    isLoading: profileApi.loading,
    error: profileApi.error,
  };
};
