const express = require('express');
const router = express.Router();
const returnedProductsController = require('../controllers/returnedProductsController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-returned-products-reason', authenticateToken, returnedProductsController.createReturnedProductsReason);
router.get('/get-all-returned-products-reasons', authenticateToken, returnedProductsController.getAllReturnedProductsReasons);
router.delete('/delete-returned-products-reason/:id', authenticateToken, returnedProductsController.deleteReturnedProductsReason);
router.post('/create-returned-product/:user_id', authenticateToken, returnedProductsController.createReturnedProduct);
router.get('/get-all-returned-products/:user_id', authenticateToken, returnedProductsController.getAllReturnedProducts);

module.exports = router;