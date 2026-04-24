import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "@/Store/Slices/apiSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});
