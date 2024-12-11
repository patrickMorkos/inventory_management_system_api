const express = require('express');
const router = express.Router();
const vanProductsController = require('../controllers/vanProductsController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/add-products/:user_id', authenticateToken, vanProductsController.addProductsToVan);
router.get('/get-all-van-products/:user_id', authenticateToken, vanProductsController.getAllVanProducts);
router.put('/update-products-quantities/:user_id', authenticateToken, vanProductsController.updateVanProductsQuantities);
router.delete('/remove-product-from-van/:user_id', authenticateToken, vanProductsController.removeProductFromVan);

module.exports = router;