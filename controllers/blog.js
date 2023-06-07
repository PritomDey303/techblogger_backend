const uploader = require("../middlewares/multerUploader");
const CloudinaryUploader = require("../middlewares/cloudinaryUploader");
const fs = require("fs");
const Blog = require("../database/schema/blogSchema");
const Comment = require("../database/schema/commentSchema");
const Like = require("../database/schema/likeSchema");
const User = require("../database/schema/userSchema");
const Rating = require("../database/schema/ratingSchema");
const { default: mongoose } = require("mongoose");

async function blogImgMulterUpload(req, res, next) {
  try {
    const upload = await uploader(
      "blogImgs",
      ["image/jpeg", "image/jpg", "image/png", "image/gif"],
      1000000,
      "Only .jpg, jpeg, .gif or .png format allowed!"
    );

    upload.any()(req, res, (err) => {
      if (err) {
        console.log(err);
        res.json({
          status: "error",
          message: "Image upload failed!",
        });
      } else {
        next();
      }
    });
  } catch (error) {
    //console.log(error);
    res.json({
      status: "error",
      error: "Sorry! Something went wrong.",
    });
  }
}

//cloudinary uploader

async function blogCloudinaryUploader(req, res, next) {
  console.log("event image cloudinary upload");
  try {
    const uploader = new CloudinaryUploader();
    if (req.method === "POST") {
      const urls = [];

      for (let file of req.files) {
        const { path } = file;
        const newPath = await uploader.uploadImage(
          path,
          "techblogger/blogImgs"
        );
        console.log(newPath);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      // console.log(urls);
      req.blogImgs = urls;

      next();
    } else {
      res.json({
        status: "error",
        message: "Images not uploaded successfully.",
      });
    }
  } catch (err) {
    console.log("error");
    for (let file of req.files) {
      const { path } = file;
      fs.unlinkSync(path);
    }
    res.json({
      status: "error",
      message: err.message,
    });
  }
}

//create blog
async function createBlog(req, res) {
  try {
    const { title, description, category } = req.body;
    const blog = new Blog({
      title,
      description,
      category,
      author: req.user._id,
      image_url: req.blogImgs[0].url,
    });
    const newBlog = await blog.save();
    res.json({
      status: "success",
      message: "Blog created successfully!",
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Blog creation failed!",
    });
  }
}

//////////////////////////////////////
//get all blogs data for home page with load more functionality
async function getAllBlogs(req, res) {
  try {
    const { page, limit } = req.query;
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const count = await Blog.countDocuments();
    res.json({
      status: "success",
      message: "Blogs fetched successfully!",
      data: {
        blogs,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Blogs fetch failed!",
    });
  }
}

//get blog by id with author details,comments,ratings and likes

async function getBlogById(req, res) {
  console.log(req.params.id + "blog id");
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    const blog = await Blog.findById(id).populate("author", "name");
    const comments = await Comment.find({ blog: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    const ratings = await Rating.find({ blog: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    const likes = await Like.find({ blog: id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    //average rating calculation with only one digit after decimal
    //calculate average rating
    let avgrating = 0;
    if (ratings.length > 0) {
      let sum = 0;
      for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating;
      }
      avgrating = sum / ratings.length;
      avgrating = avgrating.toFixed(1);
    }

    const blogData = {
      ...blog._doc,
      comments,
      ratings,
      avgrating,
      likes,
      likesCount: likes.length,
    };

    res.json({
      status: "success",
      message: "Blog fetched successfully!",
      data: blogData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "error",
      message: "Blog fetch failed!",
    });
  }
}

//delete blog by blog id and author id and delete all comments,ratings and likes related to that blog
async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.author == req.user._id) {
      await Blog.findByIdAndDelete(req.params.id);
      await Comment.deleteMany({ blog: req.params.id });
      await Rating.deleteMany({ blog: req.params.id });
      await Like.deleteMany({ blog: req.params.id });
      res.json({
        status: "success",
        message: "Blog deleted successfully!",
      });
    } else {
      res.json({
        status: "error",
        message: "You are not authorized to delete this blog!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Blog deletion failed!",
    });
  }
}
module.exports = {
  blogImgMulterUpload,
  blogCloudinaryUploader,
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
};
