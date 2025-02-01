const router = require("express").Router();
const { Router } = require("express");
const MessManager = require("../models/managers");
const { createToken } = require("../services/index");
const { authMiddlewareManager } = require("../middlewares/auth");
const Menu = require("../models/menus");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingManager = await MessManager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: "Manager already exists" });
    }

    // Create new manager
    const manager = new MessManager({
      name,
      email,
      password,
    });
    await manager.save();

    // Generate JWT token
    const token = createToken(manager);
    res.cookie("token", token);

    res.status(201).json({ message: "Signup successful", token, manager });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing up", error });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if manager exists
    const manager = await MessManager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Verify password
    if (manager.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = createToken(manager);
    res.cookie("token", token);

    res.status(200).json({ message: "Signin successful", token, manager });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
});

router.post("/add-menu", authMiddlewareManager, async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const newMenu = new Menu({ name, price, category });
    await newMenu.save();
    res.status(200).json({ message: "Menu added successfully", newMenu });
  } catch (error) {
    res.status(500).json({ message: "Error adding menu", error });
  }
});

module.exports = router;
