import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";

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

    if (error.response?.status === 401 && !originalRequest._retry && 
        originalRequest.url !== AUTH_ENDPOINTS.login.url && 
        originalRequest.url !== AUTH_ENDPOINTS.refreshToken.url) {
      
      originalRequest._retry = true;

      try {
        const accessToken = localStorage.getItem("userToken");
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken || !accessToken) throw new Error("Missing tokens for refresh");

        const response = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINTS.refreshToken.url}`, {
          accessToken: accessToken,
          refreshToken: refreshToken
        });

        const responseData = response.data?.data || response.data;
        const newToken = responseData?.token;
        const newRefreshToken = responseData?.refreshToken;

        if (!newToken || (response.data?.isSuccess === false)) {
          throw new Error(response.data?.message || "Token refresh failed");
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

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
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
