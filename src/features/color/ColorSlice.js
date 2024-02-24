import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import colorService from './ColorService';

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getColors = createAsyncThunk("color/get-colors", async (product, thunkAPI) => {
  try {
    return await colorService.getColors();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: first time of class 09

export const createColor = createAsyncThunk("color/create-color", async (colorData, thunkAPI) => {
    try {
      return await colorService.createColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: following brandService -> deleteBrand

export const getSingleColor = createAsyncThunk("color/get-single-color", async (id, thunkAPI) => {
  try {
    return await colorService.getSingleColor(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: following brandService -> deleteBrand

export const deleteColor = createAsyncThunk("color/delete-color", async (id, thunkAPI) => {
  try {
    return await colorService.deleteColor(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: following brandService -> updateBrand

export const updateColor = createAsyncThunk("color/update-color", async (colorData, thunkAPI) => {
  try {
    return await colorService.updateColor(colorData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
        state.message = "success";
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
      })
      // TODO: first time of class 09
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
        state.message = "success";
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
      })
      // TODO: first time of class 14
      .addCase(getSingleColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorTitle = action.payload.title;
        state.message = "success";
      })
      .addCase(getSingleColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
      })
      // TODO: first time of class 14
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
        state.message = "success";
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
      })
      // TODO: first time of class 14
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
        state.message = "success";
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.colors = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default colorSlice.reducer;