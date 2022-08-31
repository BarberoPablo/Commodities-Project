import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts", //nombre del slice- pasarlo al store
  initialState: {
    allPosts: [],
    posts: [],
    postsSearch:[],
    postsCategory: [],
    search:true
  },
  reducers: {
    setSearch:(state,action)=>{
      state.search=action.payload
    },
    getAllPosts: (state, action) => {
      state.allPosts = action.payload;
      state.posts = action.payload;
      state.postsCategory = action.payload;
    },
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
      state.postsSearch=filtered
    },
    filteredSubcategory: (state, action) => {
      state.postsCategory = state.allPosts.filter((e) =>
        e.subCategory.includes(action.payload)
      );
      state.posts = state.allPosts.filter((e) =>
        e.subCategory.includes(action.payload)
      );
    },

    filteredPayment: (state, action) => {
      if(state.search){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsSearch.filter((e) =>
              e.payment.includes(action.payload)
            );
      }else{
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsCategory.filter((e) =>
              e.payment.includes(action.payload)
            );
      }
      
    },
    filteredCountry: (state, action) => {
      if(state.search){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsSearch.filter((e) => e.country === action.payload);
      }else{
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsCategory.filter((e) => e.country === action.payload);
      }
     
    },
    filteredShippment: (state, action) => {
      if(state.search){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsSearch.filter((e) => e.shipping[0] === action.payload);
      }else{
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsCategory.filter((e) => e.shipping[0] === action.payload);
      }
      
    },
    //more actions
  },
});
export const {
  getAllPosts,
  getPosts,
  filteredSubcategory,
  filteredPayment,
  filteredCountry,
  filteredShippment,
  setSearch
} = postSlice.actions;
export default postSlice.reducer;

//PARA CREAR OTRO SLICE HACERLO EN OTRO ARCHIVO
