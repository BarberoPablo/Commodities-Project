const express = require("express");
const router = express.Router();

const { getUserDetails, getPosts, createPost, getCategory, getSubCategory, getReview } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.get("/posts/:idPost", getPosts);

router.get("/review/:id", getReview);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.get("/subCategory/:id", getSubCategory);

module.exports = { router };