const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  getAllBlogsByUserId,
} = require("../controllers/blog");
const router = express.Router();

//create blog route
router.post(
  "/create",
  checkLogin,

  createBlog
);

//get all blogs
router.get("/", getAllBlogs);

//get blog by id
router.get("/:id", getBlogById);
//get blog by userid
router.get("/user/data", checkLogin, getAllBlogsByUserId);
//delete blog by id
router.delete("/delete/:id", checkLogin, deleteBlog);
module.exports = router;
