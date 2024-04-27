import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { toFormData } from "axios";

const API_URL = "http://localhost:3000/api/admins/auth";
// axios.defaults.withCredentials = true;
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
          state.error = "Invalid email or password";
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
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  },
  
);


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
// LOGIN USER
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axios.get(
        API_URL.concat("/logout"),
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
  async (userCredentials, { rejectWithValue }) => {
    try {
      // Create a new FormData object
      const formData = toFormData(userCredentials);

      // Append each key-value pair from userCredentials to the FormData object
      // Object.keys(userCredentials).forEach((key) => {
      //   formData.append(key, userCredentials[key]);
      // });

      // Send the request with FormData instead of the raw userCredentials object
      const request = await axios.post(
        API_URL.concat("/register"),
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


export default userSlice.reducer;
