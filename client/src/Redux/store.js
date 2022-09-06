import { configureStore } from "@reduxjs/toolkit";
import posts from "./Slices/postsSlice";
import users from "./Slices/usersSlice";
import categories from "./Slices/categoriesSlice";
import countries from "./Slices/countriesSlice";
import plans from "./Slices/plansSlice";
import reviews from "./Slices/reviewsSlice";

export default configureStore({
  reducer: {
    posts: posts,
    users: users,
    categories: categories,
    countries: countries,
    plans: plans,
    reviews: reviews,
    //more Slices
  },
});
