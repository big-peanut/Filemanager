// Import necessary packages and modules
const express = require("express"); // Import Express
const bp = require("body-parser"); // Import Body Parser
const cors = require("cors"); // Import CORS
const sequelize = require("./utils/db"); // Import Sequelize
const userRoutes = require("./routes/userRoutes"); // Import User Routes
const folderRoutes = require("./routes/folderRoutes"); // Import Folder Routes
const fileRoutes = require("./routes/fileRoutes"); // Import File Routes

const app = express(); // Create an Express application

app.use(bp.json()); // Use body-parser middleware for JSON parsing
app.use(cors()); // Use CORS middleware for cross-origin requests

// Use defined routes for different functionalities
app.use(userRoutes); // Use User Routes
app.use(folderRoutes); // Use Folder Routes
app.use(fileRoutes); // Use File Routes

// Sync Sequelize models with the database and start the server
sequelize
  .sync()
  .then((res) => {
    // If sync is successful, start the server on port 3000
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    // If there's an error during sync or server start, log the error
    console.log(err);
  });
