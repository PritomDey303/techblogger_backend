const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const { createComment } = require("../controllers/comment");
const { createRating } = require("../controllers/rating");

router.post("/create", checkLogin, createRating);

module.exports = router;
