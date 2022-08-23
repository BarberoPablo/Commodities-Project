import {configureStore} from '@reduxjs/toolkit'
import posts from './Slices/postsSlice'
import users from './Slices/usersSlice'
import categories from './Slices/categoriesSlice'

export default configureStore({
  reducer:{
    posts: posts,
    users:users,
    categories:categories,
    //more Slices
  }
})