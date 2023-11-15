// Import necessary modules
const express = require("express");
const folderController = require("../controllers/folderController"); // Import folder controller
const userauthenticate = require("../middleware/auth"); // Import authentication middleware

const router = express.Router(); // Create a new router instance

// Route to create a folder, authenticated via user authentication middleware
router.post(
  "/createFolder",
  userauthenticate.authenticate,
  folderController.createFolder
);

// Route to fetch folders, authenticated via user authentication middleware
router.get(
  "/getFolders",
  userauthenticate.authenticate,
  folderController.getFolder
);

// Route to fetch subfolders for a specified parent folder, authenticated via user authentication middleware
router.get(
  "/getSubFolders/:parentId",
  userauthenticate.authenticate,
  folderController.getSubFolder
);

// Route to create a subfolder, authenticated via user authentication middleware
router.post(
  "/createSubfolder",
  userauthenticate.authenticate,
  folderController.createSubfolder
);

// Route to delete a folder (without authentication)
router.delete("/deleteFolder/:folderId", folderController.deleteFolder);

module.exports = router; // Export the router for use in other parts of the application
