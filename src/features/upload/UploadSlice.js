import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import uploadService from './UploadService';

const initialState = {
  productImages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const uploadProductImg = createAsyncThunk("upload/products/images", async (data, thunkAPI) => {
  try {
    const formData = new FormData();

    for (let i = 0; i < data.length; i++) {
      formData.append("images", data[i]);
    };
    console.log('formData -> uploadSlice', formData);

    return await uploadService.uploadProductImg(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const uploadSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProductImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProductImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productImages = action.payload;
        state.message = "success";
      })
      .addCase(uploadProductImg.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.productImages = null;
        state.message = action.error;
      })
  }
});

export default uploadSlice.reducer;