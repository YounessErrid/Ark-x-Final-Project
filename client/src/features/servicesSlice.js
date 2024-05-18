import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

// Async thunk for deleting a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/services/"+ id);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/services");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a service
export const createService = createAsyncThunk(
  "services/createService",
  async (service, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/services", service);
      const data = await response.data;
      return data;
    } catch (error) {
      
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async (service, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/services/"+ service._id , service);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state of the services slice
const initialState = {
  services: [],
  loading: false,
  error: null,
  status: null,
};

// Services slice definition
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
        state.error = action.error.message;
      })
      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The service was deleted successfully");
        state.services = state.services.filter(
          (service) => service._id !== action.payload._id
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("Failed to delete the service");
        state.error = action.error.message;
      })
      // Create service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The service was created successfully");
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("Failed to create the service");
        if (action.payload.error.response.status === 409) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      })
      // Update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The service was updated successfully");
        state.services = state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("Failed to update the service");
        if (action.error && action.payload.error.response.status === 409) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      });
  },
});

// Export actions and reducer
export default servicesSlice.reducer;
