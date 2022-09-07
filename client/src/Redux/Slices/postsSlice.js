import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts", //nombre del slice- pasarlo al store
  initialState: {
    allPosts: [],
    allPostsAdmin: [],
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
      state.allPosts = action.payload.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      state.posts = action.payload.sort(function(a,b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      state.postsCategory = action.payload;
    },
    getAllPostsAdmin: (state, action) => {
      state.allPostsAdmin = action.payload;
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
      if(state.search === 'search'){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsSearch.filter((e) =>
              e.payment.includes(action.payload)
            );
      }else if(state.search === 'categories'){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsCategory.filter((e) =>
              e.payment.includes(action.payload)
            );
      }else{
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.allPosts.filter((e) =>
              e.payment.includes(action.payload)
            );
      }
      
    },
    filteredCountry: (state, action) => {
      if(state.search === 'search'){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsSearch.filter((e) => e.country === action.payload);
      }else if(state.search === 'categories'){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsCategory.filter((e) => e.country === action.payload);
      }else{
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.allPosts.filter((e) => e.country === action.payload);
      }
     
    },
    filteredShippment: (state, action) => {
      if(state.search === 'search'){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsSearch.filter((e) => e.shipping[0] === action.payload);
      }else if(state.search === 'categories'){
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.postsCategory.filter((e) => e.shipping[0] === action.payload);
      }else{
        state.posts =
        action.payload === "ALL"
          ? state.allPosts
          : state.allPosts.filter((e) => e.shipping[0] === action.payload);
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
  setSearch,
  getAllPostsAdmin
} = postSlice.actions;
export default postSlice.reducer;
