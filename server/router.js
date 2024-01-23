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
    return null;
  }

  let response = await userService.findByToken(token);

  if (response === null) {
    res.status(404);
  } else {
    let { name, family, role, _id, email } = response;
    let parsedData = { name, family, role, _id, email };
    console.log(parsedData);
    res.status(200).json({ user: parsedData });
  }
});

router.get('/loadUsers',async(req,res)=>{
  console.log('asd');
  let data = await userService.loadUsers();
 
  res.status(200).json(data);
})
router.post("/updateUser", async (req, res) => {
  const body = req.body;
  
  const userData = body.userInfo;
  const userId = body.userId;
  

  try {
    await userService.updateUser(userId, userData);
  } catch (error) {
    throw error;
  }
  res.status(200).end();
});

router.post("/deleteUser", async (req, res) => {
  const body = req.body;
 
  try {
    await userService.deleteUser(body.userId);
  } catch (error) {
    throw error;
  }
  res.status(200).end();
});
module.exports = router;
