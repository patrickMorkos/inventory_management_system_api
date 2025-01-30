const express = require('express');
const router = express.Router();
const clientStockController = require('../controllers/clientStockController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/add-products/:client_id', authenticateToken, clientStockController.addProductsToClientStock);
router.get('/get-all-client-stock-products/:client_id', authenticateToken, clientStockController.getAllClientStocksProducts);
router.put('/update-products-quantities/:client_id', authenticateToken, clientStockController.updateProductQuantity);
router.delete('/remove-product-from-client-stock/:client_id', authenticateToken, clientStockController.removeProductFromClientStock);

module.exports = router;