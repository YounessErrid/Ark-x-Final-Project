import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/";


export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("payments"));
      
      // if (response.status === 404) {
      //   // If no services are found, handle it gracefully
      //   console.log(data);
      //   return [];
      // }
      console.log(response);
      
      if (response.status !== 200) {
        // Throw an error with the response status text
        throw new Error(response.statusText);
      }
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  subscriptions: null,
  loading: false,
  error: null,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get services
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        if (action.status === 404) {
          state.error = action.error.message ;
        } else {
          state.error = action.error.message;
        }
      })
  },
});


export default paymentsSlice.reducer;
