import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews", //nombre del slice- pasarlo al store
  initialState: {
    Reviews: [],
  },
  reducers: {
    getAllReviews: (state, action) => {
      state.Reviews = action.payload;
    },
  },
});

export const { getAllReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;