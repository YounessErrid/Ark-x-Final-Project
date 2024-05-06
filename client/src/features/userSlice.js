import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { toFormData } from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:3000/api";
// axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  success: null,
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
        state.error = null;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Rejected") {
          state.error = "Invalid email or password";
        } else {
          state.error = action.error.message;
        }
      })
      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.success) {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Rejected") {
          state.error = "Logout failed.";
        } else {
          state.error = action.error.message;
        }
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Rejected") {
          state.error = "Email already exists.";
        } else {
          state.error = action.error.message;
        }
      })
      //forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        if (action.error.message === "Rejected") {
          state.error = "Can't find this email";
        } else {
          state.error = action.error.message;
        }
      })
      // reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.success = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        // state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        // state.success = false;
        // if (action.error.message === "Rejected") {
        //   state.error = "Can't find this email";
        // } else {
        //   state.error = action.error.message;
        // }
      });
  },
});

// LOGIN USER
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        API_URL.concat("/admins/auth/login"),
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
// LOGOUT USER
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axios.get(API_URL.concat("/admins/auth/logout"), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Send cookies with the request
      });
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//user register

//user register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Create a new FormData object
      const formData = toFormData(userCredentials);
      // Send the request with FormData instead of the raw userCredentials object
      const request = await axios.post(
        API_URL.concat("/clients/auth/register"),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
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
export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const frontendHost = window.location.host;
      const request = await axios.post(
        API_URL.concat("/admins/auth/forgotPassword"),
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Host": frontendHost, // Custom header for frontend host
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
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userCredentials }, { rejectWithValue }) => {
    try {
      const request = await axios.put(
        API_URL.concat(`/admins/auth/resetPassword/${token}`),
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json", // Custom header for frontend host
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
