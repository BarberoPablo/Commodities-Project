import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name:'categories', 
  initialState:{
    allCategories:[],
  },
  reducers:{
    getCategories: (state,action)=>{
      state.allCategories = action.payload
    },
    
    //more actions
  }
})

export const {getCategories} = categoriesSlice.actions
export default categoriesSlice.reducer