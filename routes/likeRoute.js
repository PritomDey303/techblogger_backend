const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");
const { createLike, checkLike } = require("../controllers/like");

router.post("/create", checkLogin, createLike);
router.get("/check/:id", checkLogin, checkLike);
module.exports = router;
