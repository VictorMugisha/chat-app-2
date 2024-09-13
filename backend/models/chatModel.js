const mongoose = require("mongoose");

// Define the Chat Schema
const ChatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  message: { type: String, required: true },
  attachments: [{ type: String }], // URLs to any files attached
  repliedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // Optional reference to another chat message being replied to
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the `updatedAt` field before saving
ChatSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Chat", ChatSchema);
