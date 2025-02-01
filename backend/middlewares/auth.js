const jwt = require("jsonwebtoken");
const User = require("../models/user");
const MessManager = require("../models/managers");
const secret = process.env.SECRET;

const authMiddlewareUser = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret); // Use a strong secret key
    console.log(decoded);
    const user = await User.findById(decoded._id);

    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found auth" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const authMiddlewareManager = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret);

    // Ensure only managers can add menus

    const manager = await MessManager.findById(decoded._id);

    if (!manager) {
      return res.status(404).json({ message: "Manager not found auth" });
    }

    req.manager = manager;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = { authMiddlewareUser, authMiddlewareManager };
