import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/";

// Fetch Agencies
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    console.log({
      id: id,
    });
    try {
      const response = await axios.delete(API_URL.concat("services/", id));

      if (response.status === 404) {
        // If no services are found, handle it gracefully
        console.log(response);
        return;
      }

      console.log(response);

      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Agencies
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("services"));

      if (response.error) {
        // If no services are found, handle it gracefully
        console.log(response);
        return [];
      }

      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  services: [],
  loading: false,
  error: null,
  status: null,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.status = null;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        if (action.status === 404) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      })
      // Delete services
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The Serves Deleted Successfully");
        state.services = state.services.filter(
          (service) => service._id !== action.payload._id
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("The Serves doesn't Deleted");
        if (action.status === 404) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

// export const {deleteService} = servicesSlice.actions;
export default servicesSlice.reducer;
