const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const { createLike } = require("../controllers/like");

router.post("/create", checkLogin, createLike);

module.exports = router;
