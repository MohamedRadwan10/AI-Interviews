import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";
import { normalizeUrl } from "@/Utils/Func/UrlHelper";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const isRetry = originalRequest._retry;
    
    const requestUrl = normalizeUrl(originalRequest.url, API_BASE_URL);
    const loginUrl = normalizeUrl(AUTH_ENDPOINTS.login.url, API_BASE_URL);
    const refreshUrl = normalizeUrl(AUTH_ENDPOINTS.refreshToken.url, API_BASE_URL);

    if (is401 && !isRetry && requestUrl !== loginUrl && requestUrl !== refreshUrl) {
      originalRequest._retry = true;

      try {
        const accessToken = localStorage.getItem("userToken");
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken || !accessToken) {
          throw new Error("Missing tokens for refresh");
        }

        const refreshFullUrl = `${API_BASE_URL}${AUTH_ENDPOINTS.refreshToken.url}`;
        const response = await axios.post(refreshFullUrl, {
          accessToken: accessToken,
          refreshToken: refreshToken
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
          window.dispatchEvent(new CustomEvent("tokenRefreshed", { 
            detail: { newToken, newRefreshToken } 
          }));
        }

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        
        if (originalRequest.headers.set) {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed, logging out...", refreshError);
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
