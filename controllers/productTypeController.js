const productTypeService = require('../services/productTypeService');

class ProductTypeController {
    async createProductType(req, res) {
        try {
            const productType = await productTypeService.createProductType(req.body);
            console.log(`Log::Successfully created product type with id: '${productType.id}'`);
            res.status(200).json(productType);
        } catch (error) {
            console.log(`Log::Failed to create product type with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProductTypes(req, res) {
        try {
            const productTypes = await productTypeService.getAllProductTypes();
            console.log('Log::Successfully retrieved all product types');
            res.status(200).json(productTypes);
        } catch (error) {
            console.log('Log::Failed to retrieve all product types');
            res.status(400).json({ error: error.message });
        }
    }

    async getProductTypeById(req, res) {
        try {
            const productType = await productTypeService.getProductTypeById(req.params.id);
            console.log(`Log::Successfully retrieved product type with id: '${req.params.id}'`);
            res.status(200).json(productType);
        } catch (error) {
            console.log(`Log::Failed to retrieve product type with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductTypeById(req, res) {
        try {
            const updatedProductType = await productTypeService.updateProductTypeById(req.params.id, req.body);
            console.log(`Log::Successfully updated product type with ID: '${req.params.id}'`);
            res.status(200).json(updatedProductType);
        } catch (error) {
            console.error(`Log::Failed to update product type with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProductTypeById(req, res) {
        try {
            const deletedProductType = await productTypeService.deleteProductTypeById(req.params.id);
            console.log(`Log::Successfully deleted product type with ID: '${req.params.id}'`);
            res.status(200).json(deletedProductType);
        } catch (error) {
            console.error(`Log::Failed to delete product type with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProductTypeController();
