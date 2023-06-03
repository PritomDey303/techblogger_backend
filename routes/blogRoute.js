const express = require("express");
const checkLogin = require("../middlewares/checkLogin");
const {
  blogImgMulterUpload,
  blogCloudinaryUploader,
  createBlog,
  getAllBlogs,
  getBlogById,
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
module.exports = router;
