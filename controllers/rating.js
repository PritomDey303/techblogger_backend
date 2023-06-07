const Rating = require("../database/schema/ratingSchema");

//create rating after checking if user has already rated the blog or not. If rated, update the rating else create a new rating for the blog.
async function createRating(req, res) {
  try {
    const rating = await Rating.findOne({
      user: req.user._id,
      blog: req.body.blogid,
    });

    if (rating) {
      rating.rating = req.body.rating;
      await rating.save();
    } else {
      const rating = new Rating({
        rating: req.body.rating,
        user: req.user._id,
        blog: req.body.blogid,
      });

      await rating.save();
    }

    res.json({
      status: "success",
      message: "Rating created successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "error",
      message: "Sorry! Something went wrong.r",
    });
  }
}

//rating check
async function checkRating(req, res) {
  //console.log(req.params.id);
  try {
    const rating = await Rating.findOne({
      user: req.user._id,
      blog: req.params.id,
    });

    if (rating) {
      res.json({
        status: "success",
        message: "Rating found!",
        rating: rating.rating,
      });
    } else {
      res.json({
        status: "error",
        message: "Rating not found!",
        rating: 0,
      });
    }
  } catch (error) {
    console.log(error.message + "checkRating");
    res.json({
      status: "error",
      message: "Sorry! Something went wrong.",
    });
  }
}

module.exports = {
  createRating,
  checkRating,
};
