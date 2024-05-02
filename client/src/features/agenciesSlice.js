import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/";
//delete agency
export const deleteAgency = createAsyncThunk(
  "agencies/deleteAgency",
  async (id, { rejectWithValue }) => {
    console.log({
      id: id,
    });
    try {
      const response = await axios.delete(API_URL.concat("agencies/", id));

      if (response.status === 404) {
        // If no agencies are found, handle it gracefully
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
export const fetchAgencies = createAsyncThunk(
  "agencies/fetchAgencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("agencies"));

      console.log(response);
      if (response.error) {
        // If no agencies are found, handle it gracefully
        return [];
      }
      // console.log(response);

      // if (response.status !== 200) {
      //   // Throw an error with the response status text
      //   throw new Error(response.statusText);
      // }

      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  agencies: [],
  loading: false,
  error: null,
  status: null,
};

export const agenciesSlice = createSlice({
  name: "agencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get agencies
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
        if (action.status === 404) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      })
      // delete agency
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
        toast.error("The Agency doesn't Deleted");
        if (action.status === 404) {
          state.error = action.error.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default agenciesSlice.reducer;
