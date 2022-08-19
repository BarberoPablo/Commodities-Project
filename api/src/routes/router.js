const express = require("express");
const router = express.Router();

const { getUserDetails, createPost, getCategory, getReview, createReview } = require("./services");

router.get("/userDetails/:id", getUserDetails);

router.get("/review/:id", getReview);
router.post("/post/:id", createPost);

router.get("/category", getCategory);
router.post("/review/", createReview);




module.exports = { router };