const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../lib/middlewares/middlewares');
const upload = require('../lib/middlewares/uploadFilemiddleware');

router.post('/create-client', authenticateToken, clientController.createClient);
router.get('/get-client/:id', authenticateToken, clientController.getClientById);

module.exports = router;
