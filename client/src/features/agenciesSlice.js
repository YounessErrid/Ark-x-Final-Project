import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/";

// Fetch Agencies
export const fetchAgencies = createAsyncThunk(
  "agencies/fetchAgencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL.concat("agencies"));
      
      // if (response.status === 404) {
      //   // If no agencies are found, handle it gracefully
      //   console.log(data);
      //   return [];
      // }
      console.log(response);
      
      if (response.status !== 200) {
        // Throw an error with the response status text
        throw new Error(response.statusText);
      }

      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  agencies: null,
  loading: false,
  error: null,
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
      })
      .addCase(fetchAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.agencies = action.payload;
      })
      .addCase(fetchAgencies.rejected, (state, action) => {
        state.loading = false;
        if (action.status === 404) {
          state.error = action.error.message ;
        } else {
          state.error = action.error.message;r
        }
      })

  },
});


export default agenciesSlice.reducer;
