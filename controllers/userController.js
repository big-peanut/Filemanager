const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretkey = "sandeepsundarlenka";

exports.signup = async (req, res, next) => {
  try {
    // Extract data from request body
    const { name, email, password } = req.body;

    // Check if the user already exists based on the email
    const existingUser = await Users.findOne({ where: { email: email } });

    // If user already exists, return a 400 error
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already registered. Please login" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    // Create a new user with hashed password
    const data = await Users.create({
      name: name,
      email: email,
      password: hash,
    });

    // Return the data of the created user as JSON response
    res.json({ data: data });
  } catch (err) {
    // Catch any errors that occur during signup process
    res.status(500).json({ error: "Failed to sign up" });
  }
};

function generateAccessToken(id, name) {
  // Generate a JWT token with user ID and name using the secret key
  return jwt.sign({ id: id, name: name }, secretkey);
}

exports.login = async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user based on the provided email
    const existingUser = await Users.findOne({ where: { email: email } });

    // If user does not exist, return a 404 error
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "Email not registered. Please sign up" });
    }

    // Compare the provided password with the stored hashed password
    const result = await bcrypt.compare(password, existingUser.password);

    // If passwords match, generate a JWT token and send it as a response
    if (result) {
      const token = generateAccessToken(existingUser.id, existingUser.name);
      return res
        .status(200)
        .json({ message: "User login successful", token: token });
    } else {
      // If passwords don't match, return a 400 error
      return res.status(400).json({ error: "Incorrect password" });
    }
  } catch (err) {
    // Catch any errors that occur during login process
    res.status(500).json({ error: "Failed to login" });
  }
};
