const express = require('express');
const router = express.Router();
const whsController = require('../controllers/whsController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-whs', authenticateToken, whsController.createWhs);
router.get('/get-all-whs', authenticateToken, whsController.getAllWhs);
router.get('/get-whs/:id', authenticateToken, whsController.getWhsById);
router.put('/update-whs/:id', authenticateToken, whsController.updateWhsById);
router.delete('/delete-whs/:id', authenticateToken, whsController.deleteWhsById);

module.exports = router;
