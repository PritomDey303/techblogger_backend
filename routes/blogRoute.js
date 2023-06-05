const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const {
  blogImgMulterUpload,
  blogCloudinaryUploader,
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} = require("../controllers/blog");
const router = express.Router();

//create blog route
router.post(
  "/create",
  checkLogin,
  blogImgMulterUpload,
  blogCloudinaryUploader,
  createBlog
);

//get all blogs
router.get("/", getAllBlogs);

//get blog by id
router.get("/:id", getBlogById);
//delete blog by id
router.delete("/delete/:id", checkLogin, deleteBlog);
module.exports = router;
