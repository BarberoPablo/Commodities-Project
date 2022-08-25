import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name:'users', //nombre del slice- pasarlo al store 
  initialState:{
    user: {},
    allUsers:[],
    logUser:{},
  },
  reducers:{
    getUserDetail: (state, action) =>{
      state.user = action.payload;
    },
    getAllUsers: (state,action)=>{
      state.allUsers=action.payload;
    },
    userLog: (state, action) =>{
      state.logUser = action.payload;
    }
    
    //more actions
  }
})

export const {getUserDetail, getAllUsers, userLog} = postSlice.actions
export default postSlice.reducer