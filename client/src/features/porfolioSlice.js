import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  portfolio: [],
  loading: false,
  error: null,
  status: null,
};

export const updatePortfolio = createAsyncThunk(
  "portfolio/updatePortfolio",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/portfolio/${data.id}`, data.formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// export const createPorfolioService = createAsyncThunk(
//   "portfolioServices/createPorfolioService",
//   async (data, { rejectWithValue }) => {
//     try {
//       console.log("data");

//       const response = await axiosInstance.post(`/portfolioServices/`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const deletePortfolioService = createAsyncThunk(
//   "portfolioServices/deletePortfolioService",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.delete(`/portfolioServices/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

// export const updatePortfolioService = createAsyncThunk(
//   "portfolioServices/updatePortfolioService",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.put(`/portfolioServices/${data.serviceId}`, data.formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch portfolio service
      .addCase(updatePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioServices = action.payload;
      })
      .addCase(updatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("this is the updated description",action.payload);
      })
  
  },
});

export default portfolioSlice.reducer;
