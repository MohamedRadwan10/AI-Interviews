import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINTS } from "../Config/apiRegistry";

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
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINTS.refreshToken.url}`, {
          refreshToken: refreshToken
        });

        const newToken = response.data?.data?.token || response.data?.token;
        const newRefreshToken = response.data?.data?.refreshToken || response.data?.refreshToken;

        if (!newToken) throw new Error("New token not found in response");

        localStorage.setItem("userToken", newToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
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
