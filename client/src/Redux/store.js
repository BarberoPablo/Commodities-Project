import {configureStore} from '@reduxjs/toolkit'
import posts from './Slices/postsSlice'
import users from './Slices/usersSlice'

export default configureStore({
  reducer:{
    posts: posts,
    users:users,
    //more Slices 
  }
})