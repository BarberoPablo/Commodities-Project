const express = require("express");
const router = express.Router();

const {
  getPosts,
  createPost,
  getCategory,
  getReviews,
  createReview,
  createPlan,
  getPlanDetail,
  assignPlanToUser,
  modifyOrCreateCategory,
  modifyOrCreateUser,
  getUserDetail,
  getAllUsers,
  getUserPosts,
  getAllPlans,
  sendEmail,
  getFeedback,
  postFeedback,
  modifyReview,
  addUserContact,
  userBan,
  deleteOrAddFavorite,
  reportOrBanPost,
  getUserId,
  modifyPlan

} = require("./services");

router.get("/posts/", getPosts);

router.get("/posts/:email", getUserPosts);

router.get("/reviews/:id", getReviews);

router.post("/review/", createReview);

router.post("/post/:email", createPost);

router.get("/category", getCategory);

router.post("/plan/", createPlan);

router.get("/plan/:name", getPlanDetail);

router.get("/plans", getAllPlans);

router.post("/planUser", assignPlanToUser);

router.post("/category/:name", modifyOrCreateCategory);

router.post("/user", modifyOrCreateUser);

router.get("/user/:email", getUserDetail);

router.get("/userId/:id", getUserId);

router.get("/users", getAllUsers);

router.get("/plans", getAllPlans);

router.post("/mail", sendEmail);

router.get("/feedback", getFeedback);

router.post("/feedback/:id", postFeedback);

router.put("/admin-panel/review/:userId", modifyReview);

router.put("/user/:idSearcher/:idPoster", addUserContact);

router.put("/userBan/:id", userBan);

router.put("/favorite", deleteOrAddFavorite);

router.put("/admin-panel/post/:postId/:idReview", reportOrBanPost);

router.put("/plan/:namePlan", modifyPlan);

module.exports = { router };
