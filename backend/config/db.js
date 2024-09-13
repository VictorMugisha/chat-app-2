const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://victormugisha:victormugisha123@nodenetninja.hd6g2.mongodb.net/chat-app-two?retryWrites=true&w=majority&appName=NodeNetNinja"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
