const express = require('express');
const router = express.Router();
const productDescriptionController = require('../controllers/productDescriptionController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-product-description', authenticateToken, productDescriptionController.createProductDescription);
router.get('/get-all-product-descriptions', authenticateToken, productDescriptionController.getAllProductDescriptions);
router.get('/get-product-description/:id', authenticateToken, productDescriptionController.getProductDescriptionById);
router.put('/update-product-description/:id', authenticateToken, productDescriptionController.updateProductDescriptionById);
router.delete('/delete-product-description/:id', authenticateToken, productDescriptionController.deleteProductDescriptionById);

module.exports = router;
