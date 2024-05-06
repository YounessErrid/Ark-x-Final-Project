import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toFormData } from "axios";
import axiosInstance from "../utils/axiosInstance";


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
      // Handle checkSession action
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // If session is valid, update user state
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          // If session is not valid, clear user state
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      // .addCase(checkSession.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      //   // If session validation fails, clear user state
      //   state.user = null;
      //   state.isAuthenticated = false;
      // })
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
        // state.user = action.payload.user;
        // state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Rejected") {
          state.error = "Email already exists.";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === "Rejected") {
          state.error = "Can't find this email";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

// Action to check session validity
export const checkSession = createAsyncThunk(
  "user/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/admins/auth/checkSession");
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/admins/auth/login", userCredentials);
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
      const request = await axiosInstance.get("/admins/auth/logout");
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
      const request = await axiosInstance.post("/clients/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
          },
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
      // Create a new FormData object
      const formData = toFormData(userCredentials);
      // Send the request with FormData instead of the raw userCredentials object
      const request = await axiosInstance.post(
        "/admins/auth/forgotPassword",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
          },
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
