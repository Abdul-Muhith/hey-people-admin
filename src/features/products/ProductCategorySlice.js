import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import productCategoryService from './ProductCategoryService';

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getProductCategories = createAsyncThunk("product/get-product-categories", async (product, thunkAPI) => {
  try {
    return await productCategoryService.getProductCategories();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: first time of class 09

export const createProductCategory= createAsyncThunk("product/create-product-category", async (productData, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: class 13

export const getSingleProductCategory = createAsyncThunk("product/get-single-product-category", async (id, thunkAPI) => {
  try {
    return await productCategoryService.getSingleProductCategory(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: class 13

export const deleteProductCategory = createAsyncThunk("product/delete-product-category", async (id, thunkAPI) => {
    try {
      return await productCategoryService.deleteProductCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: class 13

export const updateProductCategory = createAsyncThunk("product/update-product-category", async (productCategoryData, thunkAPI) => {
    try {
      return await productCategoryService.updateProductCategory(productCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const productCategoriesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
        state.message = "success";
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.productCategories = null;
        state.message = action.error;
      })
      // TODO: first time of class 09
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProductCategory = action.payload;
        state.message = "success";
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.productCategories = null;
        state.message = action.error;
      })
      // TODO: first time of class 13
      .addCase(getSingleProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategoryTitle = action.payload.title;
        state.message = "success";
      })
      .addCase(getSingleProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.productCategories = null;
        state.message = action.error;
      })
      // TODO: first time of class 13
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProductCategory = action.payload;
        state.message = "success";
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.productCategories = null;
        state.message = action.error;
      })
      // TODO: first time of class 13
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProductCategory = action.payload;
        state.message = "success";
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.productCategories = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default productCategoriesSlice.reducer;