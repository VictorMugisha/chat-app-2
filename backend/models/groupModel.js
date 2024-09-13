const mongoose = require("mongoose");

// Define the Group Schema
const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the group
  description: { type: String }, // Optional description of the group
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of user IDs who are members
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of user IDs who are admins
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // User who created the group
  createdAt: { type: Date, default: Date.now }, // When the group was created
  updatedAt: { type: Date, default: Date.now }, // When the group was last updated
  isPrivate: { type: Boolean, default: false }, // Whether the group is private or public
  profilePicture: { type: String }, // URL to group profile picture
});

// Middleware to update the `updatedAt` field before saving
GroupSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Group", GroupSchema);
