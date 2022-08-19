import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name:'posts', //nombre del slice- pasarlo al store 
  initialState:{
    allPosts:[],
  },
  reducers:{
    //trae todos los posteos
    getAllPosts: (state,action)=>{
      state.allPosts=action.payload
    },
    //traerme los posteos que se busca en el search
    getPosts: (state,action)=>{
      state.allPosts=action.payload
    }
    //more actions
  }
})

export const {getAllPosts, getPosts} = postSlice.actions
export default postSlice.reducer


//PARA CREAR OTRO SLICE HACERLO EN OTRO ARCHIVO