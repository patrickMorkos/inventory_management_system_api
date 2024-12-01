const ProductType = require('../models/ProductType');

class ProductTypeService {
    async createProductType(data) {
        let newProductType = await ProductType.create({ ...data });
        return newProductType;
    }

    async getAllProductTypes() {
        const productTypes = await ProductType.findAll();
        return productTypes;
    }

    async getProductTypeById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product type ID.");
        }
        const productType = await ProductType.findOne({ where: { id } });
        if (productType == null) {
            throw new Error("Product type not found.");
        }
        return productType;
    }

    async updateProductTypeById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product type ID.");
        }
        const productType = await ProductType.findOne({ where: { id } });
        if (productType == null) {
            throw new Error("Product type not found.");
        }
        let updatedProductType = await productType.update(data);
        return updatedProductType;
    }

    async deleteProductTypeById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid product type ID.");
        }
        const productType = await ProductType.findOne({ where: { id } });
        if (productType == null) {
            throw new Error("Product type not found.");
        }
        let result = await ProductType.destroy({ where: { id } });
        if (result == 1) {
            return {
                status: 200,
                message: `Successfully deleted product type with ID: '${id}'`,
            };
        } else {
            throw new Error("Failed to delete product type.");
        }
    }
}

module.exports = new ProductTypeService();
