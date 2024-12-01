const ProductSize = require('../models/ProductSize');

class ProductSizeService {
    async createProductSize(data) {
        const newProductSize = await ProductSize.create({ ...data });
        return newProductSize;
    }

    async getAllProductSizes() {
        const productSizes = await ProductSize.findAll();
        return productSizes;
    }

    async getProductSizeById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product size ID.");
        }
        const productSize = await ProductSize.findOne({ where: { id } });
        if (!productSize) {
            throw new Error("Product size not found.");
        }
        return productSize;
    }

    async updateProductSizeById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product size ID.");
        }
        const productSize = await ProductSize.findOne({ where: { id } });
        if (!productSize) {
            throw new Error("Product size not found.");
        }
        const updatedProductSize = await productSize.update(data);
        return updatedProductSize;
    }

    async deleteProductSizeById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product size ID.");
        }
        const productSize = await ProductSize.findOne({ where: { id } });
        if (!productSize) {
            throw new Error("Product size not found.");
        }
        const result = await ProductSize.destroy({ where: { id } });
        if (result === 1) {
            return { status: 200, message: `Successfully deleted product size with ID: '${id}'` };
        }
        throw new Error(`Failed to delete product size with ID: '${id}'`);
    }
}

module.exports = new ProductSizeService();
