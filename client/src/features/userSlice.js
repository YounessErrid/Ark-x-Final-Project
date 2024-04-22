import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/clients/auth";
axios.defaults.withCredentials = true;
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Rejected") {
          state.error = "Sign up Failed! Invalid Inputs";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

// LOGIN USER
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        API_URL.concat("/login"),
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send cookies with the request
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//user register

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        API_URL.concat("/Register"),
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send cookies with the request
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export default userSlice.reducer;
