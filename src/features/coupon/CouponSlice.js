import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import couponService from './CouponService';

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getCoupons = createAsyncThunk("coupon/get-coupons", async (coupon, thunkAPI) => {
  try {
    return await couponService.getCoupons();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createCoupon = createAsyncThunk("coupon/create-coupon", async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleCoupon = createAsyncThunk("coupon/get-single-coupon", async (id, thunkAPI) => {
  try {
    return await couponService.getSingleCoupon(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteCoupon = createAsyncThunk("coupon/delete-coupon", async (id, thunkAPI) => {
  try {
    return await couponService.deleteCoupon(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateCoupon = createAsyncThunk("coupon/update-coupon", async (couponData, thunkAPI) => {
  try {
    return await couponService.updateCoupon(couponData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
        state.message = "success";
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
        state.message = "success";
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
      })
      .addCase(getSingleCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponName = action.payload.name;
        state.couponExpiry = action.payload.expiry;
        state.couponDiscount = action.payload.discount;
        state.message = "success";
      })
      .addCase(getSingleCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload;
        state.message = "success";
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
        state.message = "success";
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.coupons = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default couponSlice.reducer;