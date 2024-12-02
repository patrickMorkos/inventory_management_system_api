const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../lib/middlewares/middlewares');
const upload = require('../lib/middlewares/uploadFilemiddleware');

router.post('/create-product', authenticateToken, upload.single('image_url'), productController.createProduct);
router.get('/get-all-products', authenticateToken, productController.getAllProducts);
router.get('/get-product/:id', authenticateToken, productController.getProductById);
router.put('/update-product/:id', authenticateToken, upload.single('image_url'), productController.updateProductById);
router.delete('/delete-product/:id', authenticateToken, productController.deleteProductById);

module.exports = router;
