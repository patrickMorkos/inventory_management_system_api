const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-sale/:user_id', authenticateToken, saleController.createSale);
router.delete('/delete-sale/:id', authenticateToken, saleController.deleteSaleById);
router.put('/update-sale/:id', authenticateToken, saleController.updateSaleById);
router.get('/get-all-client-sales/:user_id', authenticateToken, saleController.getAllClientSales);

module.exports = router;
