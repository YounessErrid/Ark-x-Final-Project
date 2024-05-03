import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// API base URL
const API_URL = "http://localhost:3000/api/";

// Async thunk to delete an agency by ID
export const deleteAgency = createAsyncThunk(
  "agencies/deleteAgency",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(API_URL.concat("agencies/", id));
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch all agencies
export const fetchAgencies = createAsyncThunk(
  "agencies/fetchAgencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("agencies"));
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for agencies slice
const initialState = {
  agencies: [],
  loading: false,
  error: null,
  status: null,
};

// Define agencies slice
export const agenciesSlice = createSlice({
  name: "agencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch agencies reducers
      .addCase(fetchAgencies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(fetchAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.status = null;
        state.agencies = action.payload;
      })
      .addCase(fetchAgencies.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })
      // Delete agency reducers
      .addCase(deleteAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The Agency Deleted Successfully");
        state.agencies = state.agencies.filter(
          (agency) => agency._id !== action.payload.data._id
        );
      })
      .addCase(deleteAgency.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("The Agency wasn't Deleted");
        state.error = action.error.message;
      });
  },
});

export default agenciesSlice.reducer;
