const router = require("express").Router();
const User = require("../models/user");
const { createToken } = require("../services/index");
const { authMiddlewareUser } = require("../middlewares/auth");
const Menu = require("../models/menus");

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
    res.cookie("token", token);

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
    const newUser = await user.save();

    // Generate JWT Token
    // console.log(newUser);
    const token = createToken(newUser);
    res.cookie("token", token);

    res.status(201).json({ message: "Signup successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/book-order/:id", authMiddlewareUser, async (req, res) => {
  const id = req.params.id;

  try {
    // Find the menu item by ID
    const order = await Menu.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the user who is booking the order
    const existingUser = await User.findById(req.user._id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the order with menuId and timestamp to the user's orders array
    existingUser.orders.push({
      menuId: order._id, // The menu item being ordered
      date: Date.now(), // The current timestamp when the order is placed
    });

    // Save the updated user data
    await existingUser.save();

    // Respond with a success message and the order details
    res.status(200).json({ message: "Order booked successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/stats", authMiddlewareUser, async (req, res) => {
  try {
    const userOrders = await User.findById(req.user._id).populate("orders");
    if (!userOrders) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
