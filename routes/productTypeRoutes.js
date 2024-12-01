const express = require('express');
const router = express.Router();
const productTypeController = require('../controllers/productTypeController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-product-type', authenticateToken, productTypeController.createProductType);
router.get('/get-all-product-types', authenticateToken, productTypeController.getAllProductTypes);
router.get('/get-product-type/:id', authenticateToken, productTypeController.getProductTypeById);
router.put('/update-product-type/:id', authenticateToken, productTypeController.updateProductTypeById);
router.delete('/delete-product-type/:id', authenticateToken, productTypeController.deleteProductTypeById);

module.exports = router;
