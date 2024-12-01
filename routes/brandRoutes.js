const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authenticateToken = require('../lib/middlewares/middlewares');

router.post('/create-brand', authenticateToken, brandController.createBrand);
router.get('/get-all-brands', authenticateToken, brandController.getAllBrands);
router.get('/get-brand/:id', authenticateToken, brandController.getBrandById);
router.put('/update-brand/:id', authenticateToken, brandController.updateBrandById);
router.delete('/delete-brand/:id', authenticateToken, brandController.deleteBrandById);

module.exports = router;