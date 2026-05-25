import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/Services/api";

export const fetchApiData = createAsyncThunk(
  "api/fetchData",
  async ({ url, method = "GET", params = {}, data = null, headers = {}, key, silent = false }, { rejectWithValue }) => {
    try {
      const response = await api({
        url,
        method,
        params,
        data,
        headers,
      });

      return {
        key,
        data: response.data,
      };
    } catch (error) {
      const isSilent = silent;
      if (!isSilent) {
        console.error(`API Error for key [${key}]:`, error);
      }
      const errorMessage = error.response?.data || error.message;
      return rejectWithValue({ key, error: errorMessage });
    }
  }
);