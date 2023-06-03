const mongoose = require("mongoose");

const connectDB = (URI, DB_NAME) => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
