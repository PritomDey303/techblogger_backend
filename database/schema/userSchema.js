//generate a user schema where username password email mobile and name are required

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
