const express = require("express");
const router = express.Router();

const { getUserDetails, getPosts, createPost, getCategory, getSubCategory, getReviews, createReview , postCategory, createPlan } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.get("/posts/:idPost", getPosts);

router.get("/reviews/:id", getReviews);

router.post("/review/", createReview);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.get("/subCategory/:id", getSubCategory);

router.post("/category", postCategory)

router.post("/plan/", createPlan);

module.exports = { router };