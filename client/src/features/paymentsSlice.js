import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


// Async thunk to fetch all payments
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/payments");

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
      const response = await axiosInstance.delete("payments/"+ id);
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
