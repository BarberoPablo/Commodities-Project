import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users", //nombre del slice- pasarlo al store
  initialState: {
    user: {},
    allUsers: [],
    logUser: {},
  },
  reducers: {
    getUserDetail: (state, action) => {
      state.user = action.payload;
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    userLog: (state, action) => {
      state.logUser = action;
    },
    createUser: (state, action) => {
      state.user = action.payload;
    },

    //more actions
  },
});

export const { getUserDetail, getAllUsers, createUser, userLog } = userSlice.actions;
export default userSlice.reducer;
