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
}

module.exports = new CategoryService();