import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// stats
export const getStats = createAsyncThunk(
  "statistics/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/statistics");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// charts data
export const getChartData = createAsyncThunk(
  "statistics/getChartData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/statistics/revenue");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// lates payments
export const getLatestTransactions = createAsyncThunk(
  "statistics/getLatestTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/statistics/transactions");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  stats: {
    revenue: {
        current: null,
        previous: null
    },
    subscriptions: {
        current: null,
        previous: null
    },
    agencies: null,
    clients: null,
  },
  monthlyRevenue: [],
  monthlySubscription: [],
  transactions: [],
};

export const statisticSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get stats
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.data;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // get monthly revenu
      .addCase(getChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyRevenue = action.payload.data.monthlyRevenue;
        state.monthlySubscription = action.payload.data.monthlySubscription;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // get latest transactions
      .addCase(getLatestTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatestTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data.latesTransationsData;
        // console.log("this is lates transactions ", action.payload.data);
      })
      .addCase(getLatestTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statisticSlice.reducer;
