const express = require("express");
const router = express.Router();


const { getUserDetails, getPosts, createPost, getCategory, getSubCategory, getReviews, createReview } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.get("/posts/:idPost", getPosts);

router.get("/review/:id", getReviews);

router.post("/review/", createReview);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.get("/subCategory/:id", getSubCategory);






module.exports = { router };