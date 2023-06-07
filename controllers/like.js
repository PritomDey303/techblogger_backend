const Like = require("../database/schema/likeSchema");

//create like after checking if user has already liked the blog or not. Impleting like and unlike functionality.
async function createLike(req, res) {
  try {
    const like = await Like.findOne({
      user: req.user._id,
      blog: req.body.blogid,
    });

    if (like) {
      await Like.findByIdAndDelete(like._id);
      return res.json({
        status: "success",
        message: "Like removed successfully!",
      });
    } else {
      const like = new Like({
        user: req.user._id,
        blog: req.body.blogid,
      });

      await like.save();
    }

    res.json({
      status: "success",
      message: "Liked successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "error",
      message: "Sorry! Something went wrong.",
    });
  }
}

module.exports = {
  createLike,
};
