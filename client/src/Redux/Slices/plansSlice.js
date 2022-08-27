import { createSlice } from "@reduxjs/toolkit";

export const planSlice = createSlice({
  name: "plans", //nombre del slice- pasarlo al store
  initialState: {
    memberships: [],
  },
  reducers: {
    getAllPlans: (state, action) => {
      state.memberships = action.payload;
    },
  },
});

export const { getAllPlans } = planSlice.actions;
export default planSlice.reducer;
