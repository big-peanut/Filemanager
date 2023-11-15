// Import necessary modules
const express = require("express");
const userController = require("../controllers/userController"); // Import user controller

const router = express.Router(); // Create a new router instance

// Define routes for user signup and login, handled by respective functions in the user controller
router.post("/user/signup", userController.signup); // Route for user signup
router.post("/user/login", userController.login); // Route for user login

module.exports = router; // Export the router to be used in other parts of the application
