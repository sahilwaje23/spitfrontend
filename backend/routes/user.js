const router = require("express").Router();
const User = require("../models/user");
const { createToken } = require("../services/index");

router.post("/signin", async (req, res) => {
  const { rollNo, password } = req.body;

  try {
    const user = await User.findOne({ rollNo });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Directly compare passwords (without hashing)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    res.status(200).json({ message: "Signin successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/signup", async (req, res) => {
  const { name, rollNo, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ rollNo });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (without hashing password)
    const user = new User({ name, rollNo, password });
    await user.save();

    // Generate JWT Token
    const token = createToken(user);

    res.status(201).json({ message: "Signup successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
