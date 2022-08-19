import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name:'users', //nombre del slice- pasarlo al store 
  initialState:{
    allUsers:[],
  },
  reducers:{
    getAllUsers: (state,action)=>{
      console.log(action.payload)
      state.allUsers=action.payload
    },
    
    //more actions
  }
})

export const {getAllUsers} = postSlice.actions
export default postSlice.reducer