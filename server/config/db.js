const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");

const connectDB = async function () {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the .env file");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.log("Unable to connect to the database: ", error);
    throw error;
  }
};

module.exports = connectDB;
