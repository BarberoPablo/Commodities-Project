const express = require("express");
const router = express.Router();

const { getUserDetails, createPost, getPosts } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.get("/posts/:id", getPosts);

router.post("/post/:id", createPost);

module.exports = { router };