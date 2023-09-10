const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();
router.post('/user/signup',userControllers.signup);

module.exports = router;