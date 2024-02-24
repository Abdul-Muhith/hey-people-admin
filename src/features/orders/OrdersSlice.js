import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import orderService from './OrdersService';

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getAllOrders = createAsyncThunk("order/get-all-orders", async (orders, thunkAPI) => {
  try {
    return await orderService.getAllOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getSingleUserOrders = createAsyncThunk("order/single-user-orders", async (id, thunkAPI) => {
  try {
    return await orderService.getSingleUserOrders(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//TODO: AFTER CLASS 18

export const getMonthlyUserOrders = createAsyncThunk("order/monthly-orders", async (thunkAPI) => {
  try {
    return await orderService.getMonthlyUserOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getYearlyUserOrders = createAsyncThunk("order/yearly-orders", async (thunkAPI) => {
  try {
    return await orderService.getYearlyUserOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateSingleOrderStatusByOrderId = createAsyncThunk("order/update-order-status", async (orderData, thunkAPI) => {
  try {
    return await orderService.updateSingleOrderStatusByOrderId(orderData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: CLASS 18 i build this for my viewOrder.js

export const getSingleOrderByOrderId = createAsyncThunk("order/single-order", async (id, thunkAPI) => {
  try {
    return await orderService.getSingleOrderByOrderId(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
      })
      // TODO: CLASS 17
      .addCase(getSingleUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderByUserId = action.payload;
        // state.orderByUserId = action.payload.products;
        state.message = "success";
      })
      .addCase(getSingleUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
      })
      .addCase(getMonthlyUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.monthlyUserOrders = action.payload;
        state.message = "success";
      })
      .addCase(getMonthlyUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
      })
      .addCase(getYearlyUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.yearlyUserOrders = action.payload;
        state.message = "success";
      })
      .addCase(getYearlyUserOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
      })
      // TODO: CLASS 18 i build this for my viewOrder.js
      .addCase(getSingleOrderByOrderId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrderByOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleOrder = action.payload;
        state.message = "success";
      })
      .addCase(getSingleOrderByOrderId.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
      })
      // TODO: CLASS 18
      .addCase(updateSingleOrderStatusByOrderId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSingleOrderStatusByOrderId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderStatus = action.payload;
        state.message = "success";
      })
      .addCase(updateSingleOrderStatusByOrderId.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.orders = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default orderSlice.reducer;

// TODO: move to auth/AuthService.js