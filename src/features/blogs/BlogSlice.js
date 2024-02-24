import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import blogService from './BlogService';

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getBlogs = createAsyncThunk("blog/get-blogs", async (user, thunkAPI) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO: last time of class 09

export const createBlog = createAsyncThunk("blog/create-blogs", async (blogData, thunkAPI) => {
    try {
      return await blogService.createBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleBlog = createAsyncThunk("blog/get-single-blog", async (id, thunkAPI) => {
  try {
    return await blogService.getSingleBlog(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteBlog = createAsyncThunk("blog/delete-blog", async (id, thunkAPI) => {
  try {
    return await blogService.deleteBlog(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateBlog = createAsyncThunk("blog/update-blog", async (blogData, thunkAPI) => {
  try {
    return await blogService.updateBlog(blogData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
        state.message = "success";
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogs = null;
        state.message = action.error;
      })
      // TODO: last time of class 09
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
        state.message = "success";
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogs = null;
        state.message = action.error;
      })
      // TODO: class 15
      .addCase(getSingleBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogTitle = action.payload.title;
        state.blogCategory = action.payload.category;
        state.blogDescription = action.payload.description;
        state.message = "success";
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogs = null;
        state.message = action.error;
      })
      // TODO: class 15
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
        state.message = "success";
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogs = null;
        state.message = action.error;
      })
      // TODO: class 15
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
        state.message = "success";
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.blogs = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default blogSlice.reducer;