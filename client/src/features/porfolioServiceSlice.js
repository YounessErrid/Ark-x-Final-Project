import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  portfolioServices: [],
  loading: false,
  error: null,
  status: null,
};

export const fetchPortfolioServices = createAsyncThunk(
  "portfolioServices/fetchPortfolioServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/portfolioServices");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const portfolioServicesSlice = createSlice({
  name: "portfolioServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioServices.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioServices = action.payload;
      })
      .addCase(fetchPortfolioServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default portfolioServicesSlice.reducer
