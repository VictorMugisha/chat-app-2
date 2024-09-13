const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Send a chat message
router.post("/", chatController.sendMessage);

// Get chat history
router.get("/:userId", chatController.getChatHistory);

module.exports = router;
