// Import Sequelize and established sequelize instance
const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

// Import Users model for association
const Users = require("./userModel");

// Define a 'Files' model representing the structure of the 'files' table
const Files = sequelize.define("files", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  folderId: {
    type: Sequelize.INTEGER,
  },
  Location: {
    type: Sequelize.STRING,
  },
});

// Define associations between models (relationships between tables)
// A file belongs to a user (each file has a userId foreign key)
Files.belongsTo(Users, { foreignKey: "userId" });

module.exports = Files; // Export the Files model for use in other parts of the application
