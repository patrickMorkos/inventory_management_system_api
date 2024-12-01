const ProductDescription = require('../models/ProductDescription');

class ProductDescriptionService {
    async createProductDescription(data) {
        const newProductDescription = await ProductDescription.create({ ...data });
        return newProductDescription;
    }

    async getAllProductDescriptions() {
        const productDescriptions = await ProductDescription.findAll();
        return productDescriptions;
    }

    async getProductDescriptionById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product description ID.");
        }
        const productDescription = await ProductDescription.findOne({ where: { id } });
        if (!productDescription) {
            throw new Error("Product description not found.");
        }
        return productDescription;
    }

    async updateProductDescriptionById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product description ID.");
        }
        const productDescription = await ProductDescription.findOne({ where: { id } });
        if (!productDescription) {
            throw new Error("Product description not found.");
        }
        const updatedProductDescription = await productDescription.update(data);
        return updatedProductDescription;
    }

    async deleteProductDescriptionById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product description ID.");
        }
        const productDescription = await ProductDescription.findOne({ where: { id } });
        if (!productDescription) {
            throw new Error("Product description not found.");
        }
        const deletionResult = await ProductDescription.destroy({ where: { id } });
        if (deletionResult === 1) {
            return { status: 200, message: `Successfully deleted product description with ID: '${id}'` };
        }
        throw new Error("Failed to delete product description.");
    }
}

module.exports = new ProductDescriptionService();
