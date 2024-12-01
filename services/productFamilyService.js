const ProductFamily = require('../models/ProductFamily');

class ProductFamilyService {
    async createProductFamily(data) {
        const newProductFamily = await ProductFamily.create({ ...data });
        return newProductFamily;
    }

    async getAllProductFamilies() {
        const productFamilies = await ProductFamily.findAll();
        return productFamilies;
    }

    async getProductFamilyById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product family ID.");
        }
        const productFamily = await ProductFamily.findOne({ where: { id } });
        if (!productFamily) {
            throw new Error("Product family not found.");
        }
        return productFamily;
    }

    async updateProductFamilyById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product family ID.");
        }
        const productFamily = await ProductFamily.findOne({ where: { id } });
        if (!productFamily) {
            throw new Error("Product family not found.");
        }
        const updatedProductFamily = await productFamily.update(data);
        return updatedProductFamily;
    }

    async deleteProductFamilyById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product family ID.");
        }
        const productFamily = await ProductFamily.findOne({ where: { id } });
        if (!productFamily) {
            throw new Error("Product family not found.");
        }
        const deleted = await ProductFamily.destroy({ where: { id } });
        return deleted === 1
            ? { status: 200, message: `Successfully deleted product family with ID: '${id}'` }
            : { status: 500, message: "Failed to delete product family." };
    }
}

module.exports = new ProductFamilyService();
