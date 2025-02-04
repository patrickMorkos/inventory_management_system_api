const express = require('express');
const router = express.Router();
const usdLbpRateController = require('../controllers/usdLbpRateController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.get('/get-rate', authenticateToken, usdLbpRateController.getRate);
router.put('/update-rate', authenticateToken, usdLbpRateController.updateRate);

module.exports = router;
