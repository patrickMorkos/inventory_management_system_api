const categoryService = require('../services/categoryService');

class CategoryController {
    async createCategory(req, res) {
        try {
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                req.body.category_image_url = `${baseUrl}/uploads/${req.file.filename}`;
            }
            const category = await categoryService.createCategory(req.body);
            console.log(`Log::Successfully created category with id: '${category.id}'`)
            res.status(200).json(category);
        } catch (error) {
            console.log(`Log::Failed to create category with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();