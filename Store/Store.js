import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./Slices/apiSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});
