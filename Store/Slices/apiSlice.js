import { createSlice } from "@reduxjs/toolkit";
import { fetchApiData } from "@/Store/Slices/apiThunk";

const initialState = {};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state, action) => {
        const { key } = action.meta.arg;
        state[key] = { 
          data: null, 
          loading: true, 
          error: null 
        };
      })
      .addCase(fetchApiData.fulfilled, (state, { payload }) => {
        const { key, data } = payload;
        if (!state[key]) state[key] = {};
        
        state[key].loading = false;
        state[key].data = data;
        state[key].error = null;
      })
      .addCase(fetchApiData.rejected, (state, { payload, error, meta }) => {
        const key = payload?.key || meta.arg.key;
        if (!state[key]) state[key] = {};
        
        state[key].loading = false;
        state[key].error = payload?.error || error.message;
      });
  },
});

export default apiSlice.reducer;
