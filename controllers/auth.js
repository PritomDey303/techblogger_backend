const User = require("../database/schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//signup function
const signup = async (req, res) => {
  try {
    const { username, mobile, name, email, password } = req.body;
    const existingUser = await User.find({
      $or: [{ email: email }, { username: username }, { mobile: mobile }],
    });

    if (existingUser.length > 0) {
      return res.json({
        status: "error",
        message: "User already exists",
      });
    }

    const newPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      email,
      mobile,
      password: newPassword,
    });

    res.json({ status: "success", message: "You are registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "error",
      message: "Sorry! Something went wrong.",
    });
  }
};

//login function
const login = async (req, res) => {
  try {
    const { email, mobile, username, password } = req.body;
    // Search for the user based on email, mobile, or username
    const user = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }, { username: username }],
    });

    if (!user) {
      // User not found
      return res.json({ status: "error", message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Incorrect password
      return res.json({ status: "error", message: "Invalid credentials" });
    }

    // Authentication successful
    // You can generate and send a JWT token here, or perform any other desired actions
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ status: "success", message: "Login successful", token: token });
  } catch (error) {
    // Handle any errors
    //console.error(error);
    res.json({ status: "error", message: "Internal server error" });
  }
};

//logout function
const logout = async (req, res) => {
  try {
    // You can perform any other desired actions here, such as deleting the user's token from the database
    res.json({ status: "success", message: "Logout successful" });
  } catch (error) {
    // Handle any errors
    //console.error(error);
    res.json({ status: "error", message: "Internal server error" });
  }
};

//keep user logged in
const keepUserLoggedIn = async (req, res) => {
  try {
    //return user details if token is valid
    res.json({
      status: "success",
      message: "User is logged in",
      user: req.user,
    });
  } catch (error) {
    // Handle any errors
    //console.error(error);
    res.json({ status: "error", message: "Internal server error" });
  }
};

module.exports = { signup, login, logout, keepUserLoggedIn };
