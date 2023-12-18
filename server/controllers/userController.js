const router = require('express').Router();

const userService = require('../services/userService');

router.get('/usersAll', async (req, res) => {
    try {
      const users = await userService.loadUsers();
      console.log(users);
      res.send(users);
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post('/usersCreate', async (req, res) => {
    try {
      console.log(req.body);
      const newUser = await userService.register({ username: 'Pesho@gmail.com', password: '123456' });
      res.json(newUser);
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



module.exports = router