// Import Sequelize and established sequelize instance
const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

// Import models needed for associations
const Users = require("./userModel");
const Files = require("../models/fileModel");

// Define a 'Folders' model representing the structure of the 'folders' table
const Folders = sequelize.define("folders", {
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
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

// Define associations between models (relationships between tables)
// A folder belongs to a user (each folder has a userId foreign key)
Folders.belongsTo(Users, { foreignKey: "userId" });

// A folder can have a parent folder (parentId foreign key, pointing to itself)
Folders.belongsTo(Folders, { foreignKey: "parentId", as: "parent" });

// A folder can have multiple subfolders (hasMany relationship with itself)
Folders.hasMany(Folders, { foreignKey: "parentId", as: "subfolders" });

// A folder can have multiple files (hasMany relationship with the Files model)
Folders.hasMany(Files, { foreignKey: "folderId" });

module.exports = Folders; // Export the Folders model for use in other parts of the application
