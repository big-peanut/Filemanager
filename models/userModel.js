// Import Sequelize and the established sequelize instance
const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

// Define a 'Users' model that represents the structure of the 'users' table
const Users = sequelize.define("users", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users; // Export the Users model for use in other parts of the application
