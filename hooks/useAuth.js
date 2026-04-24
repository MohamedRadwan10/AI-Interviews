"use client";
import { useState, useCallback, useEffect, useMemo, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { set, get, keys, forEach } from "lodash-es";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation } from "@/hooks/common";
import { useApi } from "@/hooks/useApi";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";

export const useAfterLogin = () => {
  const { navigateTo } = useNavigation();
  
  return useCallback((user) => {
    navigateTo("/intelliHire");
  }, [navigateTo]);
};

export const useLogin = () => {
  const { setUserToken, setRefreshToken, setUserData, deviceName } = useContext(UserTokenContext);
  const loginApi = useApi({ type: "login", autoFetch: false });
  const afterLogin = useAfterLogin();

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
        
        afterLogin(user);
      }
      return data;
    } catch (err) {
      throw err;
    }
  }, [deviceName, loginApi, setUserToken, setRefreshToken, setUserData, afterLogin]);

  return { login, isLoading: loginApi.loading, error: loginApi.error };
};

export const useRegister = () => {
  const { deviceName } = useContext(UserTokenContext);
  const { navigateTo } = useNavigation();
  const registerCandidateApi = useApi({ type: "registerCandidate", autoFetch: false });
  const registerCompanyApi = useApi({ type: "registerCompany", autoFetch: false });

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
      const data = await apiHook.refetch({ data: payload });
      if (data) {
        navigateTo("/verify-email-request");
      }
      return data;
    } catch (err) {
      throw err;
    }
  }, [deviceName, registerCandidateApi, registerCompanyApi, navigateTo]);

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
      navigateTo("/login");
      logoutContext();
    }
  }, [logoutApi, navigateTo, logoutContext, deviceName]);

  return { logout, isLoading: logoutApi.loading, error: logoutApi.error };
};

export const useCompleteProfile = () => {
  const { navigateTo } = useNavigation();
  const completeUserApi = useApi({ type: "CompleteUserData", autoFetch: false });
  const completeCompanyApi = useApi({ type: "CompleteCompanyData", autoFetch: false });

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
        navigateTo("/intelliHire");
      }
      return data;
    } catch (err) {
      throw err;
    }
  }, [completeUserApi, completeCompanyApi, navigateTo]);

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
        setStatus("error");
        setError(get(err, "response.data.message"));
      }
    };
    confirmEmail();
  }, [userId, token, router, setRefreshToken, setUserData, setUserToken]);

  return { status, error, userId, token };
};

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
      const emailValue = get(values, "email");
      setEmail(emailValue);
      const config = AUTH_ENDPOINTS.forgetPassword;
      await axios({
        method: config.method,
        url: `${API_BASE_URL}${config.url}`,
        data: { email: emailValue }, 
      });
      setStep(2);
    } catch (err) {
      setError(get(err, "response.data.message"));
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
      setStep(3);
    } catch (err) {
      setError(get(err, "response.data.message"));
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
      router.push("/login?success=true");
    } catch (err) {
      setError(get(err, "response.data.message"));
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
