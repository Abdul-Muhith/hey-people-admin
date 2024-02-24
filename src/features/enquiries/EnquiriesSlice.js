import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import enquiryService from './EnquiriesService';

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
}

export const getEnquiries = createAsyncThunk("enquiries/get-enquiries", async (enquiry, thunkAPI) => {
  try {
    return await enquiryService.getEnquiries();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createEnquiry = createAsyncThunk("enquiries/create-enquiry", async (enquiryData, thunkAPI) => {
    try {
      return await enquiryService.createEnquiry(enquiryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleEnquiry = createAsyncThunk("enquiries/get-single-enquiry", async (id, thunkAPI) => {
  try {
    return await enquiryService.getSingleEnquiry(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteEnquiry = createAsyncThunk("enquiries/delete-enquiry", async (id, thunkAPI) => {
  try {
    return await enquiryService.deleteEnquiry(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateEnquiry = createAsyncThunk("enquiries/update-enquiry", async (enquiryData, thunkAPI) => {
  try {
    return await enquiryService.updateEnquiry(enquiryData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

export const colorSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
        state.message = "success";
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.enquiries = null;
        state.message = action.error;
      })
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdEnquiry = action.payload;
        state.message = "success";
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.enquiries = null;
        state.message = action.error;
      })
      .addCase(getSingleEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // state.currentEnquiry = action.payload; // TODO: findObjByIdInArray
        state.enquiryName = action.payload.name;
        state.enquiryEmail = action.payload.email;
        state.enquiryMobile = action.payload.mobile;
        state.enquiryComments = action.payload.comments;
        state.enquiryStatus = action.payload.status;
        state.message = "success";
      })
      .addCase(getSingleEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.enquiries = null;
        state.message = action.error;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
        state.message = "success";
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.enquiries = null;
        state.message = action.error;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
        state.message = "success";
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.enquiries = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  }
});

export default colorSlice.reducer;