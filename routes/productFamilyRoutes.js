const express = require('express');
const router = express.Router();
const productFamilyController = require('../controllers/productFamilyController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-product-family', authenticateToken, productFamilyController.createProductFamily);
router.get('/get-all-product-families', authenticateToken, productFamilyController.getAllProductFamilies);
router.get('/get-product-family/:id', authenticateToken, productFamilyController.getProductFamilyById);
router.put('/update-product-family/:id', authenticateToken, productFamilyController.updateProductFamilyById);
router.delete('/delete-product-family/:id', authenticateToken, productFamilyController.deleteProductFamilyById);

module.exports = router;
