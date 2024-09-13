const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register a new user
router.post(
  "/register",
  userController.uploadProfilePicture,
  userController.register
);

// Login user
router.post("/login", userController.login);

// Get user by ID
router.get("/:id", userController.getUserById);

module.exports = router;
