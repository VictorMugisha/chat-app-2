const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

// Create a new group
router.post("/", groupController.createGroup);

// Get group by ID
router.get("/:id", groupController.getGroupById);

// Add member to a group
router.post("/:groupId/members", groupController.addMember);

// Remove member from a group
router.delete("/:groupId/members", groupController.removeMember);

module.exports = router;
