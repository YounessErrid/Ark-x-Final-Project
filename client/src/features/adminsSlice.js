import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

// Async thunk for deleting an admin
export const deleteAdmin = createAsyncThunk(
  "admins/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/admins/"+ id);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching admins
export const fetchAdmins = createAsyncThunk(
  "admins/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admins");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating an admin
export const createAdmin = createAsyncThunk(
  "admins/createAdmin",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admins/createAdmin", admin);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating an admin
export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/admins/"+ admin._id , admin);
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state of the admins slice
const initialState = {
  admins: [],
  loading: false,
  error: null,
  status: null,
};

// Admins slice definition
export const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch admins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.status = null;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })
      // Delete admin
      .addCase(deleteAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The admin was deleted successfully");
        // console.log("action.payload", action.payload);
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload.userId
        );
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("Failed to delete the admin");
        state.error = action.error.message;
      })
      // Create admin
      .addCase(createAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The admin was created successfully");
        state.admins.push(action.payload);
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("Failed to create the admin");
        if (action.payload.error.response.status === 409) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      })
      // Update admin
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The admin was updated successfully");
        // console.log("action.payload", action.payload);
        state.admins = state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        );
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("Failed to update the admin");
        if (action.error && action.payload.error.response.status === 409) {
          state.error = action.payload.error.message;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      });
  },
});

// Export actions and reducer
export default adminsSlice.reducer;
