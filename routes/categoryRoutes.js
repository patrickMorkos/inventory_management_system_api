const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../lib/middlewares/middlewares');
const upload = require('../lib/middlewares/uploadFilemiddleware');

router.post('/create-category', authenticateToken, upload.single('category_image_url'), categoryController.createCategory);
router.get('/get-all-categories', authenticateToken, categoryController.getAllCategories);
router.get('/get-category/:id', authenticateToken, categoryController.getCategoryById);
router.put('/update-category/:id', authenticateToken, upload.single('category_image_url'), categoryController.updateCategoryById);
router.delete('/delete-category/:id', authenticateToken, categoryController.deleteCategoryById);

module.exports = router;