const express = require('express');
const router = express.Router();
const mainWarehouseStockController = require('../controllers/mainWarehouseStockController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/add-products', authenticateToken, mainWarehouseStockController.addProductsToMainWarehouseStock);
router.get('/get-all-main-warehouse-stock-products', authenticateToken, mainWarehouseStockController.getAllMainWarehouseStocksProducts);
router.put('/update-products-quantities', authenticateToken, mainWarehouseStockController.updateProductsQuantities);
router.delete('/remove-product-from-main-warehouse-stock', authenticateToken, mainWarehouseStockController.removeProductFromMainWarehouseStock);

module.exports = router;