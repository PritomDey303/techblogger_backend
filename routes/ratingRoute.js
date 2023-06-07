const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const { createComment } = require("../controllers/comment");
const { createRating, checkRating } = require("../controllers/rating");

router.post("/create", checkLogin, createRating);
router.get("/check/:id", checkLogin, checkRating);

module.exports = router;
