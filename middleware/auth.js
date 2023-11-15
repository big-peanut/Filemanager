const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");

// Middleware function for authentication
const authenticate = async (req, res, next) => {
  try {
    // Retrieve the token from the request header
    const token = req.header("Authorization");

    // Verify and decode the token using the provided secret key
    const decodedToken = jwt.verify(token, "sandeepsundarlenka");

    // Find the user corresponding to the decoded token's ID
    const user = await Users.findByPk(decodedToken.id);

    // Attach the found user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails or any error occurs, send a 401 Unauthorized response
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { authenticate };
