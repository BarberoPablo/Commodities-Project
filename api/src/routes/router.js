const express = require("express");
const router = express.Router();

const { getUserDetails, createPost, getCategory } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

module.exports = { router };