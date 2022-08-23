import { getAllPosts, getPosts, } from "../Slices/postsSlice";
import { getAllUsers } from "../Slices/usersSlice";
import axios from 'axios'
//filteredSubcategory
// FUNCTIONS POSTS

export const getPost = ()=>(dispatch)=>{
  axios('http://localhost:3001/posts') // end-point del back /posts
  .then(data => dispatch(getAllPosts(data.data)))
  .catch(e=>console.log(e))
}

export const searchPosts = (name,sell) =>(dispatch)=>{
  dispatch(getPosts(name,sell))
}

// FUNCTIONS CATEGORIES

// FILTERS SUBCATEGORY 

// export const filterBySubcategory = (value) => (dispatch)=>{
//   dispatch(filteredSubcategory(value))
// }


// FUNCTIONS USERS

export const getUser = ()=>(dispatch)=>{
  axios('https://rickandmortyapi.com/api/character') // end-point del back /users
  .then(data=>dispatch(getAllUsers(data.data.results)))
  .catch(e=>console.log(e))
}
