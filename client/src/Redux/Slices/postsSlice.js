import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name:'posts', //nombre del slice- pasarlo al store 
  initialState:{
    allPosts:[],
  },
  reducers:{
    getAllPosts: (state,action)=>{
      state.allPosts=action.payload
    }
    //more actions
  }
})

export const {getAllPosts} = postSlice.actions
export default postSlice.reducer


//PARA CREAR OTRO SLICE HACERLO EN OTRO ARCHIVO