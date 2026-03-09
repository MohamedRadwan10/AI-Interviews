import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./apiThunk";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data[payload.key] = payload.data;
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});
const apiReducer = apiSlice.reducer;

export default apiReducer;
