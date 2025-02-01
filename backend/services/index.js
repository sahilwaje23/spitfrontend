require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET 

// Function to create JWT token
function createToken(user) {
  const payload = {
    id: user._id,
    name: user.name,
    rollNo: user.rollNo,
  };

  return jwt.sign(payload, secret, { expiresIn: "15d" });
}

// Function to extract user from token
function getUserFromToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // Return null if token is invalid/expired
  }
}

module.exports = { createToken, getUserFromToken };
