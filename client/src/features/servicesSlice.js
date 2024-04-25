import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

      if (response.status === 404) {
        // If no services are found, handle it gracefully
        console.log(response);
        return [];
      }
      console.log(response);

      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  services: null,
  loading: false,
  error: null,
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
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;

      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service._id!== action.payload._id
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
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
