const Category = require('../models/Category');

class CategoryService {
    async createCategory(data) {
        //checking if category already exists
        const categoryName = data.category_name;
        const category = await Category.findOne({ where: { category_name: categoryName } });

        if (category != null) {
            throw new Error("Category with that name already exists.");
        }

        let newCategory = await Category.create({ ...data });
        return newCategory;
    }

    async getAllCategories() {
        const categories = await Category.findAll();
        return categories;
    }

    async getCategoryById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid category ID.");
        }
        const category = await Category.findOne({ where: { id } });
        if (category == null) {
            throw new Error("Category not found.");
        }
        return category;
    }

    async updateCategoryById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid category ID.");
        }
        const category = await Category.findOne({ where: { id } });
        if (category == null) {
            throw new Error("Category not found.");
        }
        if (data.category_name) {
            const categoryName = data.category_name;
            const category2 = await Category.findOne({ where: { category_name: categoryName } });
            if (category2 != null) {
                throw new Error("Category with that name already exists.");
            }
        }
        let updatedCategory = await category.update(data);
        return updatedCategory;
    }

    async deleteCategoryById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid category ID.");
        }
        const category = await Category.findOne({ where: { id } });
        if (category == null) {
            throw new Error("Category not found.");
        }
        let category2 = await Category.destroy({ where: { id: id } });
        if (category2 == 1) {
            category2 = {
                "status": 200,
                "mssg": `Successfully deleted category with ID: '${id}'`
            }
        }
        return category2;
    }

}

module.exports = new CategoryService();