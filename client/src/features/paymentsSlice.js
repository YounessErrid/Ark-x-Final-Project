import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/";

// Async thunk to fetch all payments
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("payments"),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Send cookies with the request
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a payment by ID
export const deletePayment = createAsyncThunk(
  "payments/deletePayment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(API_URL.concat("payments/", id,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Send cookies with the request
      }));

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return id; // Return the deleted payment ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  payments: [],
  loading: false,
  error: null,
  status: null,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch payments reducers
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete payment reducers
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("The Client Deleted Successfully");        
        state.payments = state.payments.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        toast.error("The Client wasn't Deleted");
        state.error = action.error.message;
      });
  },
});

export default paymentsSlice.reducer;
