import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import brandService from './BrandService';

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getBrands = createAsyncThunk("brand/get-brands", async (brand, thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: first time of class 09

export const createBrand = createAsyncThunk("brand/create-brand", async (brandData, thunkAPI) => {
    try {
      return await brandService.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: class 11

export const getSingleBrand = createAsyncThunk("brand/get-single-brand", async (id, thunkAPI) => {
  try {
    return await brandService.getSingleBrand(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: class 12

export const deleteBrand = createAsyncThunk("brand/delete-brand", async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: class 11

export const updateBrand = createAsyncThunk("brand/update-brand", async (brandData, thunkAPI) => {
    try {
      return await brandService.updateBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
        state.message = "success";
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
      })
      // TODO: first time of class 09
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
        state.message = "success";
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
      })
      // TODO: class 11
      .addCase(getSingleBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandTitle = action.payload.title;
        state.message = "success";
      })
      .addCase(getSingleBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
      })
      // TODO: class 11
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
        state.message = "success";
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
      })
      // TODO: class 12
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        state.message = "success";
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.brands = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default brandSlice.reducer;