import { createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = "bf720dd9efe080eeea407994406ddcd1";
const baseUrl = "https://api.themoviedb.org/3";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ endpoint, key }) => {
    const response = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return {
      key,
      data: data.results || data,
    };
  }
);