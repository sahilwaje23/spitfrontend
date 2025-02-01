const router = require("express").Router();
const User = require("../models/user");

router.post("/signup", (req, res) => {
  const { name, rollNo, password } = req.body;
  const user = new User({ name, rollNo, password });
  try {
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/signin", async (req, res) => {
  const { rollNo, password } = req.body;

  try {
    const user = await User.findOne({ rollNo });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Signin successful", user });

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
