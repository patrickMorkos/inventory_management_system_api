const express = require('express');
const router = express.Router();
const productPriceController = require('../controllers/productPriceController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-product-price', authenticateToken, productPriceController.createProductPrice);
router.get('/get-all-product-prices', authenticateToken, productPriceController.getAllProductPrices);
router.get('/get-product-price/:id', authenticateToken, productPriceController.getProductPriceById);
router.put('/update-product-price/:id', authenticateToken, productPriceController.updateProductPriceById);
router.delete('/delete-product-price/:id', authenticateToken, productPriceController.deleteProductPriceById);

module.exports = router;
