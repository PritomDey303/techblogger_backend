const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const port = process.env.PORT || 5000;
const User = require("./database/schema/userSchema");
const authRoute = require("./routes/authRoute");
dotenv.config();

// Allow requests from any origin
app.use(cors());

//json body parser middleware
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGO_URI, process.env.DB_NAME);

// Parsing middleware
app.use(express.urlencoded({ extended: true }));

// Routing Middleware
app.get("/", (req, res) => {
  res.send("Hello Users! Welcome to Blogging Application");
});
app.use("/api/auth", authRoute);
app.use("/api/blog", require("./routes/blogRoute"));
app.use("/api/comment", require("./routes/commentRoute"));
app.use("/api/rating", require("./routes/ratingRoute"));
app.use("/api/like", require("./routes/likeRoute"));

app.listen(port, () => console.log(`Server running on port ${port}!`));
