const express = require('express');
const router = express.Router();
const productSizeController = require('../controllers/productSizeController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-product-size', authenticateToken, productSizeController.createProductSize);
router.get('/get-all-product-sizes', authenticateToken, productSizeController.getAllProductSizes);
router.get('/get-product-size/:id', authenticateToken, productSizeController.getProductSizeById);
router.put('/update-product-size/:id', authenticateToken, productSizeController.updateProductSizeById);
router.delete('/delete-product-size/:id', authenticateToken, productSizeController.deleteProductSizeById);

module.exports = router;
