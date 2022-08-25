const express = require("express");
const router = express.Router();



const { getPosts, createPost, getCategory, 
  getReviews, createReview , createPlan, getPlanDetail, assignPlanToUser, modifyOrCreateCategory, modifyOrCreateUser,
   getUserDetail, getAllUsers } = require("./services");


router.get("/posts/", getPosts);

router.get("/reviews/:id", getReviews);

router.post("/review/", createReview);

router.post("/post/:id", createPost);

router.get("/category", getCategory);

router.post("/plan/", createPlan);

router.get("/plan/:name", getPlanDetail);

router.post("/planUser", assignPlanToUser);

router.post("/category/:name",modifyOrCreateCategory);

router.post("/user", modifyOrCreateUser);

router.get("/user/:email", getUserDetail);

router.get("/users", getAllUsers);

module.exports = { router };