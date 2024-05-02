import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/";

// Delete Services
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {

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

// Fetch Services
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

      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Services

export const createService = createAsyncThunk(
  "services/createService",
  async (service, { rejectWithValue }) => {
    try {

      const response = await axios.post(API_URL.concat("services"), service);
      const data = await response.data;
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Services

export const updateService = createAsyncThunk(
  "services/updateService",
  async (service, { rejectWithValue }) => {
    try {
      
      const response = await axios.put(
        API_URL.concat("services/", service._id),
        service
      );
      const data = await response.data;
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  services: null,
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
        state.services = state.services.filter(
          (service) => service._id !== action.payload._id
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        if (action.status === 404) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      })
      // Create services
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;        
        state.error = null;
        state.services = [...state.services, action.payload];
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        if (action.payload.error.response.status === 409) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      })
      // Update services
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.error = null;
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        console.log('action: ');
        console.log(action);
        if (action.error && action.payload.error.response.status === 409) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      });
  },
});

// export const {deleteService} = servicesSlice.actions;
export default servicesSlice.reducer;
