const Comment = require("../database/schema/commentSchema");

async function createComment(req, res) {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      user: req.user._id,
      blog: req.body.blogid,
    });

    await comment.save();

    res.json({
      status: "success",
      message: "Comment created successfully!",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Sorry! Something went wrong.",
    });
  }
}
/////////////////////////////////////
//delete comment

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() === req.user._id.toString()) {
      await comment.remove();
      res.json({
        status: "success",
        message: "Comment deleted successfully!",
      });
    } else {
      res.json({
        status: "error",
        message: "Sorry! You are not allowed to delete this comment.",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: "Sorry! Something went wrong.",
    });
  }
}

module.exports = {
  createComment,
  deleteComment,
};
