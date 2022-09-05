import {
  getAllPosts,
  getPosts,
  filteredSubcategory,
  filteredPayment,
  filteredCountry,
  filteredShippment,
  setSearch,
} from "../Slices/postsSlice";
import {
  getUserDetail,
  getAllUsers,
  userLog,
  createUser,
  getUserPosts,
  getProfileDetail,
  getContacts,
} from "../Slices/usersSlice";
import { getCategories } from "../Slices/categoriesSlice";
import { getCountries, sortCountries } from "../Slices/countriesSlice";
import { getAllPlans } from "../Slices/plansSlice";
import { getAllReviews } from "../Slices/reviewsSlice";


import axios from "axios";


// const url = "https://b2b-01.herokuapp.com";
const url = "http://localhost:3001";

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
  axios(`${url}/category`).then((resp) => dispatch(getCategories(resp.data)));
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
  axios(`${url}/users`) // end-point del back /users
    .then((data) => dispatch(getAllUsers(data.data)))
    .catch((e) => console.log(e));
};
//get counties
export const getAllCountries = () => (dispatch) => {
  axios("https://restcountries.com/v3/all") // end-point del back /users
    .then((data) => dispatch(getCountries(data.data)))
    .catch((e) => console.log(e));
};

export const userLogin = (payload) => (dispatch) => {
  axios(`${url}/user`);
  dispatch(userLog(payload));
};

export const createNewUser = (value) => (dispatch) => {
  axios.post(`${url}/user`, value);
  dispatch(createUser(value));
};

//trae los datos del usuario logeado
export const getUserDetails = (email) => (dispatch) => {
  axios(`${url}/user/${email}`)
    .then((data) => dispatch(getUserDetail(data.data)))
    .catch((e) => console.log(e));
};

//Trae los datos del usuario en especifico
export const getProfileDetails = (id) => (dispatch) => {
  axios(`${url}/userId/` + id)
    .then((data) => dispatch(getProfileDetail(data.data)))
    .catch((e) => console.log(e));
};

export const getContactsUser = (idSearch, idPost) => (dispatch) => {
  axios
    .put(`${url}/user/${idSearch}/${idPost}`)
    .then((data) => dispatch(getContacts(data.data)))
    .catch((e) => console.log(e));
};

//postPost
export const postPost = (email, input) => () => {
  axios.post(`${url}/post/${email}`, input);
};

export const getPlans = () => (dispatch) => {
  axios(`${url}/plans/`)
    .then((plans) => {
      dispatch(getAllPlans(plans.data));
    })
    .catch((e) => console.log(e));
};

//mail to us
export const mailTous = (input) => () => {
  axios.post(`${url}/mail`, input);
};

export const asignPlanToUser = (emailAndPlanName) => () => {
  axios.post(`${url}/planUser`, emailAndPlanName);
};

// countries sort

export const sortCountriesName = (value) => (dispatch) => {
  dispatch(sortCountries(value));
};

//Search or Categories

export const Searching = (value) => (dispatch) => {
  dispatch(setSearch(value));
};

// Guarda en base de datos los favoritos al logearse
export const addFavorites = (favorites) => () => {
  console.log("action", favorites);
  axios.put(`${url}/favorite`, favorites);
};

export const reportTo = (postId, idReview, event) => (dispatch) => {
  axios.put(`${url}/admin-panel/post/${postId}/${idReview}`, event)
  .then(() => {dispatch(dispatch(getPost()))
  })
  .catch((e) => console.log(e));
};

//Review

export const postReview = (review) => () =>{
  axios.post(`${url}/review`, review);
}

export const banUser = (id) => (dispatch) =>{
  axios.put(`${url}/userBan/${id}`)
  .then(() => {dispatch(dispatch(getUser()));
  })
  .catch((e) => console.log(e));
};

export const getReviews = (id) => (dispatch) => {
  axios(`${url}/reviews/${id}`) // end-point del back /posts
    .then((data) => dispatch(getAllReviews(data.data)))
    .catch((e) => console.log(e));
};

