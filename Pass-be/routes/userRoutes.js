const express = require('express');
const { forgetPassword, resetPassword, register, login } = require('../controllers/userController');

const router = express.Router();

router.post('/forget-password', forgetPassword);
router.post('/reset_password/:token', resetPassword);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
