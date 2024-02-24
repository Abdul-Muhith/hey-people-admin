import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import blogCategoryService from './BlogCategoryService';

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getBlogCategories = createAsyncThunk("blog/get-categories", async (blog, thunkAPI) => {
  try {
    return await blogCategoryService.getBlogCategories();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: first time of class 09

export const createBlogCategory= createAsyncThunk("blog/create-blogs", async (blogData, thunkAPI) => {
  try {
    return await blogCategoryService.createBlogCategory(blogData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: class 15

export const getSingleBlogCategory = createAsyncThunk("blog/get-single-blog", async (id, thunkAPI) => {
  try {
    return await blogCategoryService.getSingleBlogCategory(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: class 15

export const deleteBlogCategory = createAsyncThunk("blog/delete-blog", async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: class 15

export const updateBlogCategory = createAsyncThunk("blog/update-blog", async (blogData, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogCategory(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO: first time of class 10

export const resetState = createAction("Reset_all");

export const blogCategoriesSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
        state.message = "success";
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogCategories = null;
        state.message = action.error;
      })
      // TODO: first time of class 09
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
        state.message = "success";
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogCategories = null;
        state.message = action.error;
      })
      // TODO: class 15
      .addCase(getSingleBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategoryTitle = action.payload.title;
        state.message = "success";
      })
      .addCase(getSingleBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogCategories = null;
        state.message = action.error;
      })
      // TODO: class 15
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCategory = action.payload;
        state.message = "success";
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogCategories = null;
        state.message = action.error;
      })
      // TODO: class 15
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCategory = action.payload;
        state.message = "success";
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogCategories = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default blogCategoriesSlice.reducer;