import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './AuthService';

// delete LECTURE 06 api integration
// const userDefaultState = {
//   _id: null,
//   firstname: null,
//   lastname: null,
//   email: null,
//   mobile: null,
//   token: null,
// }

const getUserFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  // user: userDefaultState,
  user: getUserFromLocalStorage,
  // LECTURE 07
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const login = createAsyncThunk("auth/admin-login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// LECTURE 07
export const getOrders = createAsyncThunk("user/get-orders", async (orders, thunkAPI) => {
  try {
    return await authService.getOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = action.error;
      })
      // LECTURE 07
      // .addCase(getOrders.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getOrders.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.orders = action.payload;
      //   state.message = "success";
      // })
      // .addCase(getOrders.rejected, (state, action) => {
      //   state.isError = true;
      //   state.isLoading = false;
      //   state.isSuccess = false;
      //   state.orders = null;
      //   state.message = action.error;
      // })
  }
});

export default authSlice.reducer;