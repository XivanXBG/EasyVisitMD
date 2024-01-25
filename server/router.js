const express = require("express");
const router = express.Router();
const userService = require("./services/userService");
const doctorService = require('./services/doctorService')

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

router.post('/add-doctor',async(req,res)=>{
  const doctorData = req.body;
  const data = doctorData.data;

  try {
    await doctorService.createDoctor(data);
    res.status(200).end();
  } catch (error) {
    throw error
  }
})
router.get('/loadUsers',async(req,res)=>{
  
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

router.get('/doctors',async(req,res)=>{
  console.log('asd');
  let doctors=await doctorService.findAll();
  console.log(doctors);

  res.status(200).json(doctors);
})
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
