const express = require('express');
const {
  CreateRegis,
  GetAll
} = require('../../controler/Registration/registration');
const {
  Login
} = require('../../controler/Login/login');
const router = express.Router();
router.post('/create', CreateRegis);
router.post('/login', Login);
router.get('/get', GetAll);
module.exports = router;