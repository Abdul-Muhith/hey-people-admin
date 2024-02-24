import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import customerService from './CustomerService';

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getUsers = createAsyncThunk("customer/get-customers", async (user, thunkAPI) => {
  try {
    return await customerService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
        state.message = "success";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.customers = null;
        state.message = action.error;
      })
  }
});

export default customerSlice.reducer;