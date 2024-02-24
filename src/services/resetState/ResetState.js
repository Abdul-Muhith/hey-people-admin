import { createSlice, createAction } from '@reduxjs/toolkit';

// const initialState = {
//   state: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
//   message: "",
// }

const initialState = {}

export const resetState = createAction("Reset_all");

export const resetStateSlice = createSlice({
  name: "resetState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetState, () => initialState);
  }
});

export default resetStateSlice.reducer;