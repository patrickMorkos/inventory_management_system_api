const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/register', authController.register);
// router.post('/register', authenticateToken, authController.register);
router.post('/login', authController.login);
router.put('/change-password', authenticateToken, authController.changePassword);
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
