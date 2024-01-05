const express = require("express");
const router = express.Router();
const userService = require("./services/userService");

router.post("/register", async (req, res) => {
  try {
    const { token } = await userService.register(req.body);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const { token } = await userService.login(body);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
router.post("/userInfo", async (req, res) => {
 
  const token = req.body.token;
  if (!token) {
    res.sendStatus(403);
    return;
  }

  let {name,family,role,_id,email} = await userService.findByToken(token);
  let parsedData = {name,family,role,_id,email}
  res.status(200).json({ user: parsedData });
});


module.exports = router;
