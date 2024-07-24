import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  portfolioServices: [],
  portfolioService: {},
  loading: false,
  error: null,
  status: null,
};

export const fetchAgencyPortfolio = createAsyncThunk(
  "portfolioServices/fetchAgencyPortfolio",
  async (id, { rejectWithValue }) => {
    // console.log("id", id);
    try {
      const response = await axiosInstance.get(`/portfolioServices/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchPortfolioService = createAsyncThunk(
  "portfolioServices/fetchPortfolioService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/portfolioServices/agency/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createPorfolioService = createAsyncThunk(
  "portfolioServices/createPorfolioService",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data");

      const response = await axiosInstance.post(`/portfolioServices/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePortfolioService = createAsyncThunk(
  "portfolioServices/deletePortfolioService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/portfolioServices/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updatePortfolioService = createAsyncThunk(
  "portfolioServices/updatePortfolioService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/portfolioServices/${data.serviceId}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeLikePortfolioService = createAsyncThunk(
  "portfolioServices/removeLikePortfolioService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/user/likes/${data.userId}/${data.portfolioServiceId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const likePortfolioService = createAsyncThunk(
  "portfolioServices/likePortfolioService",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user/likes/${data.userId}/${data.portfolioServiceId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const removeLikePortfolioServices = createAsyncThunk(
  "portfolioServices/removeLikePortfolioServices",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/user/likes/${data.userId}/${data.portfolioServiceId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const likePortfolioServices = createAsyncThunk(
  "portfolioServices/likePortfolioServices",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/user/likes/${data.userId}/${data.portfolioServiceId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const portfolioServicesSlice = createSlice({
  name: "portfolioServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch agency portfolio servicesss
      .addCase(fetchAgencyPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencyPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioServices = action.payload;
      })
      .addCase(fetchAgencyPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch portfolioservice
      .addCase(fetchPortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioService = action.payload;
        // console.log("portfolioService", action.payload);
      })
      .addCase(fetchPortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add portfolio service
      .addCase(createPorfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPorfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        // console.log("added service data :", data);
        // state.portfolioServices.portfolioId.portfolioServices.push(data);
      })
      .addCase(createPorfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete portfolio service
      .addCase(deletePortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        // const dataId = action.payload.data._id;
        // console.log("Deleted service data ID:", dataId);
        // state.portfolioServices.portfolioId.portfolioServices = state.portfolioServices.portfolioId.portfolioServices.filter(service => service._id !== dataId);
      })
      .addCase(deletePortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update portfolio service
      .addCase(updatePortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data;
        // console.log("added service data :", data);
      })
      .addCase(updatePortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // like portfolio services
      .addCase(likePortfolioServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePortfolioServices.fulfilled, (state, action) => {
        state.loading = false;
        const { portfolioId } = action.payload;
        const userId = action.payload.userId;

        const index = state.portfolioServices.portfolioServices.findIndex(
          (portfolioService) => portfolioService._id == portfolioId
        );

        if (index !== -1) {
          state.portfolioServices.portfolioServices[index].likes.push(userId);
        }
      })
      .addCase(likePortfolioServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // remove like portfolio services
      .addCase(removeLikePortfolioServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeLikePortfolioServices.fulfilled, (state, action) => {
        state.loading = false;
        const { portfolioId } = action.payload;
        const userId = action.payload.userId;

        const index = state.portfolioServices.portfolioServices.findIndex(
          (portfolioService) => portfolioService._id == portfolioId
        );

        if (index !== -1) {
          const userIdIndex = state.portfolioServices.portfolioServices[
            index
          ].likes.findIndex((like) => like == userId);
          if (userIdIndex !== -1) {
            state.portfolioServices.portfolioServices[index].likes.splice(
              userIdIndex,
              1
            );
          }
        }
      })
      .addCase(removeLikePortfolioServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // like portfolio service 1
      .addCase(likePortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.payload.userId;
        state.portfolioService.likes.push(userId);
      })
      .addCase(likePortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // remove like portfolio services
      .addCase(removeLikePortfolioService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeLikePortfolioService.fulfilled, (state, action) => {
        state.loading = false;
        const userId = action.payload.userId;

        const userIdIndex = state.portfolioService.likes.findIndex(
          (like) => like == userId
        );
        if (userIdIndex !== -1) {
          state.portfolioService.likes.splice(userIdIndex, 1);
        }
      })
      .addCase(removeLikePortfolioService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default portfolioServicesSlice.reducer;
