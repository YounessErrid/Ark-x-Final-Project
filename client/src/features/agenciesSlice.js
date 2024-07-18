import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

// Async thunk to delete an agency by ID
export const deleteAgency = createAsyncThunk(
  "agencies/deleteAgency",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/agencies/" + id);
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
      const response = await axiosInstance.get("/agencies");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to search in agencies
export const searchAgencies = createAsyncThunk(
  "agencies/searchAgencies",
  async (searchQuery, { rejectWithValue }) => {
    // Include the search query parameter
    try {
      const response = await axiosInstance.get("/agencies/search", {
        params: { search: searchQuery }, // Pass the search query as a parameter
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAgency = createAsyncThunk(
  "agencies/fetchAgency",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/agencies/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateAgecny = createAsyncThunk(
  "agencies/updateAgecny",
  async ({data, id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/agencies/${id}`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Initial state for agencies slice
const initialState = {
  agencies: [],
  agency: {},
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
        console.log(action.payload);
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
      })
      // Search agency reducers
      .addCase(searchAgencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.agencies = action.payload.agencies; // Update the agencies array with the fetched data
        // Update other state properties if necessary (e.g., totalCount, currentPage, totalPages)
      })
      .addCase(searchAgencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update error with the error message
      })
      .addCase(fetchAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.agency = action.payload;
        // console.log("this is rge agency that comes",action.payload);
      })
      .addCase(fetchAgency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update error with the error message
      })
      // update agency
      .addCase(updateAgecny.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgecny.fulfilled, (state, action) => {
        state.loading = false;
        // state.agency = action.payload;
        // console.log(action.payload);
      })
      .addCase(updateAgecny.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update error with the error message
      });
  },
});

export default agenciesSlice.reducer;
