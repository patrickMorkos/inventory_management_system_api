const express = require('express');
const router = express.Router();
const salesmanClientVisitsController = require('../controllers/salesmanClientVisitsController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/client-check-in/:user_id', authenticateToken, salesmanClientVisitsController.clientCheckIn);
router.post('/client-check-out/:user_id', authenticateToken, salesmanClientVisitsController.clientCheckOut);

module.exports = router;