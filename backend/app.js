const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const groupRoutes = require("./routes/groupRoutes");
const authRoutes = require("./routes/authRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
const MONGO_URI =
  "mongodb+srv://victormugisha:victormugisha123@nodenetninja.hd6g2.mongodb.net/chat-app-two?retryWrites=true&w=majority&appName=NodeNetNinja";

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateToken, userRoutes); // Protect user routes
app.use("/api/chats", authenticateToken, chatRoutes); // Protect chat routes
app.use("/api/groups", authenticateToken, groupRoutes); // Protect group routes

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
