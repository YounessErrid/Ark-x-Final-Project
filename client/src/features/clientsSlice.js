import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// API base URL
const API_URL = "http://localhost:3000/api/";

// Async thunk to delete a client by ID
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(API_URL.concat("clients/", id));
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch all clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("clients"));
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for clients slice
const initialState = {
  clients: [],
  loading: false,
  error: null,
  status: null,
};

// Define clients slice
export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch clients reducers
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.status = null;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.error = action.error.message;
      })
      // Delete client reducers
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        toast.success("The Client Deleted Successfully");        
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload.data._id
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        toast.error("The Client wasn't Deleted");
        state.error = action.error.message;
      });
  },
});

export default clientsSlice.reducer;
