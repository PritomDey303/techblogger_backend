const express = require("express");
const { createComment, deleteComment } = require("../controllers/comment");
const router = express.Router();
const checkLogin = require("../middlewares/checkLogin");

router.post("/create", checkLogin, createComment);
router.delete("/delete/:id", checkLogin, deleteComment);

module.exports = router;
