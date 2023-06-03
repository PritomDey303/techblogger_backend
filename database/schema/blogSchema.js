const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    image_url: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    //author is the user who created the blog, so we need to store the user id here

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
