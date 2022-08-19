const express = require("express");
const router = express.Router();

const { getUserDetails, createPost } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.get("/review/:id", getReviews);
router.post("/post/:id", createPost);

module.exports = { router };