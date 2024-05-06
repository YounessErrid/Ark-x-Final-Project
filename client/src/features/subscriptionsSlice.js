import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetchSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/subscriptions");

      // if (response.status === 404) {
      //   // If no services are found, handle it gracefully
      //   console.log(data);
      //   return [];
      // }

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
  subscriptions: [],
  loading: false,
  error: null,
};

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get services
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        if (action.status === 404) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default subscriptionsSlice.reducer;
