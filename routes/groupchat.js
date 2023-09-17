const express = require('express');
const groupControllers = require('../controllers/groupchat');

const router = express.Router();

router.get('/groupusers/getname',groupControllers.getGroupUser);

module.exports = router;