const express = require("express");
const router = express.Router();
const userService = require("./services/userService");

router.post("/register", async (req, res) => {
  try {
    const token = await userService.register(req.body);
    res.status(200).json({token:token});
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const token = await userService.login(body);
    res.status(200).json({token:token});
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
