import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";

const REFRESH_URL = AUTH_ENDPOINTS.refreshToken.url; 
const LOGIN_URL = AUTH_ENDPOINTS.login.url;           

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const isAuthUrl = (url = "") => {
  if (!url) return false;
  return url.includes(REFRESH_URL) || url.includes(LOGIN_URL);
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const is401 = error.response?.status === 401;
    const alreadyRetried = originalRequest._retry;
    const isAuthEndpoint = isAuthUrl(originalRequest.url);

    if (!is401 || alreadyRetried || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const accessToken = localStorage.getItem("userToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken || !accessToken) {
        throw new Error("Missing tokens");
      }

      const refreshFullUrl = `${API_BASE_URL}${REFRESH_URL}`;
      const response = await axios.post(refreshFullUrl, {
        accessToken,
        refreshToken,
      });

      const responseData = response.data?.data || response.data;
      const newToken = responseData?.token || responseData?.accessToken;
      const newRefreshToken = responseData?.refreshToken;

      if (!newToken || responseData?.isSuccess === false) {
        throw new Error(responseData?.message || "Token refresh failed");
      }

      localStorage.setItem("userToken", newToken);
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("tokenRefreshed", {
            detail: { newToken, newRefreshToken },
          })
        );
      }

      processQueue(null, newToken);

      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
