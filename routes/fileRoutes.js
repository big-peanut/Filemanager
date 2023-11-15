// Import necessary modules
const express = require("express");
const userauthenticate = require("../middleware/auth"); // Import authentication middleware
const fileController = require("../controllers/filesController"); // Import file controller
const { s3Upload } = require("../services/s3Services"); // Import S3 upload service
const multer = require("multer");

const router = express.Router(); // Create a new router instance

const storage = multer.memoryStorage(); // Use memory storage for file uploads
const upload = multer({ storage });

// Route to handle adding files (upload.array() handles multiple files uploaded with the name "file")
router.post(
  "/addFile",
  upload.array("file"),
  userauthenticate.authenticate,
  async (req, res) => {
    try {
      const file = req.files[0]; // Get the uploaded file
      const result = await s3Upload(file); // Upload file to S3
      console.log(req.body.parentId); // Log the parentId from the request body (if applicable)
      res.json(result); // Send the S3 upload result as a JSON response
    } catch (err) {
      console.log(err); // Log any errors that occur during file upload
    }
  }
);

// Route to add file information to the database
router.post(
  "/addFilesToDB",
  userauthenticate.authenticate,
  fileController.addFilesToDB
);

// Route to get files for a specified folder
router.get(
  "/getFiles/:folderId",
  userauthenticate.authenticate,
  fileController.getFiles
);

// Route to delete a file
router.delete("/deleteFile/:fileName", fileController.deleteFiles);

module.exports = router; // Export the router for use in other parts of the application
