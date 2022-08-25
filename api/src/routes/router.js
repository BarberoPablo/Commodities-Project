const express = require("express");
const router = express.Router();



const { getPosts, createPost, getCategory, 
  getReviews, createReview , postCategory, createPlan, getPlans, getPlanDetail,
   assignPlanToUser, modifyCategory, modifyOrCreateUser, getUserDetail, getAllUsers } = require("./services");


router.get("/posts/", getPosts);

router.get("/reviews/:id", getReviews);

router.post("/review/", createReview);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.post("/category", postCategory)

router.post("/plan/", createPlan);

router.get("/plan", getPlans);

router.get("/plan/:name", getPlanDetail);

router.post("/planUser", assignPlanToUser);

router.post("/category/:name",modifyCategory);

router.post("/user", modifyOrCreateUser);

router.get("/user/:id", getUserDetail);

router.get("/users", getAllUsers);

module.exports = { router };