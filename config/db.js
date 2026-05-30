const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;
const connectDB = async () => {
  try {
    if (isConnected) return; // Use existing connection
    // Mongoose.connect handles the connection for all your models
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected via Mongoose");
  } catch (error) {
    console.error("❌ Mongoose Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;