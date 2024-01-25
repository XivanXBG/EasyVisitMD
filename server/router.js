const express = require("express");
const router = express.Router();
const userService = require("./services/userService");
const doctorService = require('./services/doctorService');
const Reservation = require('./models/Apoitment');

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
  
  let doctors=await doctorService.findAll();
  

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

router.post('/reserve', async (req, res) => {
  try {
    const { doctorId, patientId, date, time, type } = req.body;

   

    // Check if the selected time slot is available
    const existingReservation = await Reservation.findOne({ doctorId, date, time });
    if (existingReservation) {
      return res.status(400).json({ message: 'Selected time slot is not available.' });
    }

    // Create a new reservation
    const reservation = new Reservation({ doctorId, patientId, date, time, type });
    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully.', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
router.get('/doctor/:doctorId/appointments', async (req, res) => {
  try {
    ;
    const { doctorId } = req.params;
    const appointments = await Reservation.find({ doctorId });
    console.log(appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
