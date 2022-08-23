import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts", //nombre del slice- pasarlo al store
  initialState: {
    allPosts: [],
    posts: [],
  },
  reducers: {
    //trae todos los posteos
    getAllPosts: (state, action) => {
      console.log(action.payload);
      state.allPosts = action.payload;
      state.posts = action.payload;
    
    },
    //traerme los posteos que se busca en el search
    getPosts: (state, action) => {
      const filtered = state.allPosts.filter(
        (e) =>
          (action.payload.sell === e.sell ? false : true) &&
          (e.subCategory
            .toLowerCase()
            .includes(action.payload.input.toLowerCase()) ||
            e.country
              .toLowerCase()
              .includes(action.payload.input.toLowerCase()) ||
            e.categoryName.toLowerCase().includes(action.payload.input))
      );
      state.posts = filtered;
    },
    getUserPosts: (state, action) => {
      const info = action.payload.filter((e) => e.userId === 1);
      state.posts = info},
    //more actions
  },filteredSubcategory: (state,action)=>{
    state.posts = state.allPosts.filter((e)=> e.subCategory.includes(action.payload))
  },
});

export const { getAllPosts, getPosts, getUserPosts, filteredSubcategory } = postSlice.actions;

export default postSlice.reducer;

//PARA CREAR OTRO SLICE HACERLO EN OTRO ARCHIVO
