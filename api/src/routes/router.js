const express = require("express");
const router = express.Router();

const { getPosts, createPost, getCategory, 
  getReviews, createReview , postCategory, createPlan, createUser, getPlans, getPlanDetail } = require("./services");

router.get("/posts/", getPosts);

router.get("/reviews/:id", getReviews);

router.post("/review/", createReview);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.post("/category", postCategory)

router.post("/plan/", createPlan);

router.post("/user", createUser);

router.get("/plan", getPlans);

router.get("/plan/:name", getPlanDetail);

module.exports = { router };