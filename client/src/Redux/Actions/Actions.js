import {
  getAllPosts,
  getPosts,
  filteredSubcategory,
  getUserPosts,
  filteredPayment,
  filteredCountry,
  filteredShippment,
} from "../Slices/postsSlice";
import { getUserDetail, getAllUsers, userLog, createUser} from "../Slices/usersSlice";
import { getCategories } from "../Slices/categoriesSlice";
import { getCountries } from "../Slices/countriesSlice";

import axios from "axios";

const url = "https://b2b-01.herokuapp.com"
// FUNCTIONS POSTS

export const getPost = () => (dispatch) => {
  axios(`${url}/posts`) // end-point del back /posts
    .then((data) => dispatch(getAllPosts(data.data)))
    .catch((e) => console.log(e));
};

export const searchPosts = (name, sell) => (dispatch) => {
  dispatch(getPosts(name, sell));
};

export const userPosts = () => (dispatch) => {
  axios(`${url}/posts`) // end-point del back /posts
    .then((data) => dispatch(getUserPosts(data.data)));
};

// FUNCTIONS CATEGORIES

export const getCategoriesByName = () => (dispatch) => {
  axios(`${url}/category`).then((resp) =>
    dispatch(getCategories(resp.data))
  );
};

// FILTERS SUBCATEGORY

export const filterBySubcategory = (value) => (dispatch) => {
  dispatch(filteredSubcategory(value));
};

// FILTER PAYMENT

export const filterByPayment = (value) => (dispatch) => {
  dispatch(filteredPayment(value));
};

//FILTER COUNTRY
export const filterCountry = (value) => (dispatch) => {
  dispatch(filteredCountry(value));
};

//FILTER SHIPPMENT
export const filterShippment = (value) => (dispatch) => {
  dispatch(filteredShippment(value));
};

// FUNCTIONS USERS

export const getUser = () => (dispatch) => {
  axios("https://rickandmortyapi.com/api/character") // end-point del back /users
    .then((data) => dispatch(getAllUsers(data.data.results)))
    .catch((e) => console.log(e));
};
//get counties
export const getAllCountries = () => (dispatch) => {
  axios("https://restcountries.com/v3/all") // end-point del back /users
    .then((data) => dispatch(getCountries(data.data)))
    .catch((e) => console.log(e));
};
export const userLogin = (payload) => (dispatch) => {
  axios(`${url}/user`)
  dispatch(userLog(payload));
};

export const createNewUser = (value) => (dispatch) => {
  axios.post(`${url}/user`,value)
  dispatch(createUser(value))
}
export const getUserDetails = (email) => (dispatch) => {
  axios(`${url}/user/${email}`)
  .then((data) => dispatch(getUserDetail(data.data)))
  .catch((e) => console.log(e));
};
//postPost
export const postPost = (input)=>()=>{
  axios.post(`${url}/post/`, input)
}

//mail to us
export const mailTous = (input) => () => {
  axios.post(`${url}/mail`, input)
};