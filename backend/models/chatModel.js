const mongoose = require("mongoose");

// Define the Chat Schema
const ChatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // For one-on-one chats
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // For group chats
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  }, // Message status
  attachments: [{ type: String }], // URLs to message attachments (images, files, etc.)
  repliedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // If the message is a reply
});

module.exports = mongoose.model("Chat", ChatSchema);
