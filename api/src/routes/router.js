const express = require("express");
const router = express.Router();

const { getUserDetails, createPost, getCategory, getSubCategory } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.get("/subCategory/:id", getSubCategory);

module.exports = { router };