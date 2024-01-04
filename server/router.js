const express = require("express");
const router = express.Router();
const userService = require("./services/userService");

router.post("/register", async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.sendStatus(200); // Send 200 OK without a response body
  } catch (error) {
    
    res.status(400).json({ error: error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    await userService.login(body);
  } catch (error) {
    
    res.status(400).json({ error: error });
  }
});
module.exports = router;
