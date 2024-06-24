import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  portfolioServices: [],
  loading: false,
  error: null,
  status: null,
};

export const fetchAgencyPortfolio = createAsyncThunk(
  "portfolioServices/fetchAgencyPortfolio",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/portfolioServices/${id}`);
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
      .addCase(fetchAgencyPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencyPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioServices = action.payload;
      })
      .addCase(fetchAgencyPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default portfolioServicesSlice.reducer
