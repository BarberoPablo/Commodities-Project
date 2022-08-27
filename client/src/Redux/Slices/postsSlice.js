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
    filteredSubcategory: (state,action)=>{
      state.posts = state.allPosts.filter((e)=> e.subCategory.includes(action.payload))
    },
    getUserPosts: (state, action) => {
      const info = action.payload.filter((e) => e.userId === 11);
      state.posts = info},
    filteredPayment: (state, action) => {
      state.posts = state.allPosts.filter(e => e.payment[0] === action.payload)
    },
    filteredCountry: (state, action) => {
      state.posts = state.allPosts.filter(e => e.country === action.payload)
    },
    filteredShippment: (state, action) => {
      state.posts = state.allPosts.filter(e => e.shipping[0] === action.payload)
    }
    //more actions
  },
});
export const { getAllPosts, getPosts, getUserPosts, filteredSubcategory, filteredPayment, filteredCountry, filteredShippment } = postSlice.actions;
export default postSlice.reducer;

//PARA CREAR OTRO SLICE HACERLO EN OTRO ARCHIVO
