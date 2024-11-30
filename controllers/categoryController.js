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

    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            console.log(`Log::Successfully retrieved all categories`)
            res.status(200).json(categories);
        } catch (error) {
            console.log(`Log::Failed to retrieve all categories`)
            res.status(400).json({ error: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            console.log(`Log::Successfully retrieved category with id: '${req.params.id}'`)
            res.status(200).json(category);
        } catch (error) {
            console.log(`Log::Failed to retrieve category with id '${req.params.id}' with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }

    async updateCategoryById(req, res) {
        try {
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                req.body.category_image_url = `${baseUrl}/uploads/${req.file.filename}`;
            }
            const updatedCategory = await categoryService.updateCategoryById(req.params.id, req.body);
            console.log(`Log::Successfully updated category with ID: '${req.params.id}'`);
            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error(`Log::Failed to update category with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteCategoryById(req, res) {
        try {
            const deletedCategory = await categoryService.deleteCategoryById(req.params.id);
            console.log(`Log::Successfully deleted category with ID: '${req.params.id}'`);
            res.status(200).json(deletedCategory);
        } catch (error) {
            console.error(`Log::Failed to delete category with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();