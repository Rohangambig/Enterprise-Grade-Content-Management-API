const express = require('express');
const { registerUser, loginUser , ChangePassword } = require('../controller/auth.js');
const  { authController } = require('../middleware/auth.js');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/change-password',authController,ChangePassword)

module.exports = router;