const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();
router.post('/user/signup',userControllers.signup);
router.post('/user/login', userControllers.login);

module.exports = router;