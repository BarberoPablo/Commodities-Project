const express = require("express");
const router = express.Router();

const { getUserDetails  } = require("./services");

router.get("/userDetails/:id", getUserDetails);
