// Import Sequelize package
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // Configuration for the connection to the database
    host: process.env.DB_HOST, // Database host
    dialect: "postgres", // Database dialect (PostgreSQL)
    port: process.env.DB_PORT, // Port on which the database is running
  }
);

// Export the configured instance of Sequelize
module.exports = sequelize;
