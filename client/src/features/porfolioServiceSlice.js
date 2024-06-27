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
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createPorfolioService = createAsyncThunk(
  "portfolioServices/createPorfolioService",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data");

      const response = await axiosInstance.post(`/portfolioServices/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePortfolioService = createAsyncThunk(
  "portfolioServices/deletePortfolioService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/portfolioServices/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updatePortfolioService = createAsyncThunk(
  "portfolioServices/updatePortfolioService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/portfolioServices/${data.serviceId}`, data.formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const portfolioServicesSlice = createSlice({
  name: "portfolioServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch portfolio service
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
      })
      // add portfolio service
      .addCase(createPorfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPorfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        // console.log("added service data :", data);
        state.portfolioServices.portfolioId.portfolioServices.push(data);
      })
      .addCase(createPorfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete portfolio service
      .addCase(deletePortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const dataId = action.payload.data._id;
        console.log("Deleted service data ID:", dataId);
        state.portfolioServices.portfolioId.portfolioServices = state.portfolioServices.portfolioId.portfolioServices.filter(service => service._id !== dataId);
      })
      .addCase(deletePortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update portfolio service
      .addCase(updatePortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        // console.log("added service data :", data);
        state.portfolioServices.portfolioId.portfolioServices.push(data);
      })
      .addCase(updatePortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default portfolioServicesSlice.reducer;
