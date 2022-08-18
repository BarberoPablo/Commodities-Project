import { getAllPosts } from "../Slices/postsSlice";
import { getAllUsers } from "../Slices/usersSlice";
import axios from 'axios'

export const getPost = ()=>(dispatch)=>{
  axios('https://restcountries.com/v3.1/all') // end-point del back /posts
  .then(data => dispatch(getAllPosts(data.data)))
  .catch(e=>console.log(e))
}

export const getUser = ()=>(dispatch)=>{
  axios('https://rickandmortyapi.com/api/character') // end-point del back /users
  .then(data=>dispatch(getAllUsers(data.data.results)))
  .catch(e=>console.log(e))
}