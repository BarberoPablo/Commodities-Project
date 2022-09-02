import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users", //nombre del slice- pasarlo al store
  initialState: {
    user: {},
    userPost: [],
    allUsers: [],
    logUser: {},
    profileUser: {},
    contacts:[]
  },
  reducers: {
    getUserDetail: (state, action) => {
      state.user = action.payload;
    },
    getProfileDetail: (state, action) => {
      state.profileUser = action.payload
    },
    getUserPosts: (state, action) => {
      const info = action.payload.filter((e) => e.userId === state.user.id);
      state.userPost = info;
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
    getContacts: (state,action) => {
      state.contacts = action.payload
    }
    //more actions
  },
});

export const { getUserDetail, getAllUsers, createUser, userLog, getUserPosts, getProfileDetail, getContacts } = userSlice.actions;
export default userSlice.reducer;
