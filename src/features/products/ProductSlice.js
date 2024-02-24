import { createSlice, createAsyncThunk,createAction } from '@reduxjs/toolkit';

import productService from './ProductService';

const initialState = {
  products: [],
  // createdProduct: "", // comment class 09
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getProducts = createAsyncThunk("product/get-products", async (product, thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: last time of class 08

export const createProducts = createAsyncThunk("product/create-products", async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
        state.message = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.products = null;
        state.message = action.error;
      })
      // TODO: last time of class 08
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default productSlice.reducer;