const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../lib/middlewares/middlewares');
const upload = require('../lib/middlewares/uploadFilemiddleware');

router.post('/create-category', authenticateToken, upload.single('category_image_url'), categoryController.createCategory);

module.exports = router;