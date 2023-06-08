const jwt = require("jsonwebtoken");
const User = require("../database/schema/userSchema");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const checkLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const user = await User.findOne({
      _id: ObjectId(decoded._id),
    });
    // console.log(user);
    if (!user) {
      return res.json({
        status: "error",
        error: "User not found.",
      });
    }
    req.user = user;
    //console.log(req.user);
    next();
  } catch (error) {
    //console.log(error);
    res.json({
      status: "error",
      location: "checkLogin",
      error: "Sorry! Something went wrong.",
    });
  }
};

module.exports = checkLogin;
