const router = require("express").Router();
const Menu = require("../models/menus");

router.get("/get-all-menu", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving menu", error });
  }
});

module.exports = router;
