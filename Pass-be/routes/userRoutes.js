const express = require('express');
const { forgetPassword, resetPassword, validateToken } = require('../controllers/userController');

const router = express.Router();

router.post('/forget-password', forgetPassword);
router.post('/reset_password/:token', resetPassword);

module.exports = router;
