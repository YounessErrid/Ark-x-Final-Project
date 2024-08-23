import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

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
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        // If session validation fails, clear user state
        state.user = null;
        state.isAuthenticated = false;
      })
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
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Registration failed";
      })
      // check agency email
      .addCase(checkAgencyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAgencyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAgencyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to check email";
      })
      // register agency
      .addCase(registerAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.user = action.payload
        console.log(action.payload);
      })
      .addCase(registerAgency.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.payload.error);
        if (action.error.message === "Rejected") {
          state.error = "Email already exists.";
        } else {
          state.error = action.error.message;
        }
      })
      //Update User agency
      .addCase(updateUserAgency.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUserAgency.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.user = action.payload.user;
        state.success = true;
      })
      .addCase(updateUserAgency.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        if (action.error.message === "Rejected") {
          state.error = "Can't find this email";
        } else {
          state.error = action.error.message;
        }
      })
      //Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        if (action.error.message === "Rejected") {
          state.error = "Can't find this email";
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
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        // state.success = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("The Password Changed Successfully");
        state.error = null;
        state.user = action.payload.user;
        // state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        // toast.error("The Password Didn't Chnge");
        if (action.error.message === "Rejected") {
          state.error = "Old Password is in correct";
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
      const request = await axiosInstance.get("/auth/check-session");
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(
        "/auth/login",
        userCredentials
      );
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);
// LOGOUT USER
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/auth/logout");
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//user register

//user register
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      
      console.log("userCredentials",userCredentials);
      const request = await axiosInstance.post(
        "/clients/auth/register",
        userCredentials
       
      );
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);
// Update User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userCredentials }, { rejectWithValue }) => {
    try {
      const { fullname, email ,selectedfile, phone } = userCredentials;
      
      const formData = new FormData();
      if (email) formData.append("email", email);
      if (phone) formData.append("phone", phone);
      if (fullname) formData.append("fullname", fullname);
      if (selectedfile) formData.append("profile_image", selectedfile);
      const request = await axiosInstance.put(
        `admins/auth/update/${id}`,
        formData
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.log(error);
            return rejectWithValue(error.response?.data);
;
    }
  }
);

// update user for Agency
export const updateUserAgency = createAsyncThunk(
  "user/updateUserAgency",
  async ({ id, userCredentials }, { rejectWithValue }) => {
    try {
      const { fullname, email ,selectedfile, phone } = userCredentials;
      
      const formData = new FormData();
      if (email) formData.append("email", email);
      if (phone) formData.append("phone", phone);
      if (fullname) formData.append("fullname", fullname);
      if (selectedfile) formData.append("profile_image", selectedfile);
      const request = await axiosInstance.put(
        `admins/auth/update/${id}`,
        formData
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.log(error);
            return rejectWithValue(error.response?.data);
;
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const frontendHost = window.location.host;
      const request = await axiosInstance.post(
        "/admins/auth/forgotPassword",
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Host": frontendHost, // Custom header for frontend host
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userCredentials }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.put(
        `/admins/auth/resetPassword/${token}`,
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json", // Custom header for frontend host
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ id, userCredentials }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.put(
        `/admins/auth/changePassword/${id}`,
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json", // Custom header for frontend host
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);

// register agency
export const checkAgencyEmail = createAsyncThunk(
  "user/checkAgencyEmail",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/agencies/auth/check-email", userCredentials
      )
      const response = await request.data;
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);;
    }
  }
);
// register agency
export const registerAgency = createAsyncThunk(
  "user/registerAgency",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/agencies/auth/register", userCredentials,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
        },
      }
      )
      const response = await request.data;
      return response;
    } catch (error) {
            return rejectWithValue(error.response?.data);
;
    }
  }
);

export default userSlice.reducer;
