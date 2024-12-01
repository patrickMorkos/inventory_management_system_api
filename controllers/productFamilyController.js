const productFamilyService = require('../services/productFamilyService');

class ProductFamilyController {
    async createProductFamily(req, res) {
        try {
            const productFamily = await productFamilyService.createProductFamily(req.body);
            console.log(`Log::Successfully created product family with id: '${productFamily.id}'`);
            res.status(200).json(productFamily);
        } catch (error) {
            console.log(`Log::Failed to create product family with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProductFamilies(req, res) {
        try {
            const productFamilies = await productFamilyService.getAllProductFamilies();
            console.log(`Log::Successfully retrieved all product families`);
            res.status(200).json(productFamilies);
        } catch (error) {
            console.log(`Log::Failed to retrieve all product families`);
            res.status(400).json({ error: error.message });
        }
    }

    async getProductFamilyById(req, res) {
        try {
            const productFamily = await productFamilyService.getProductFamilyById(req.params.id);
            console.log(`Log::Successfully retrieved product family with id: '${req.params.id}'`);
            res.status(200).json(productFamily);
        } catch (error) {
            console.log(`Log::Failed to retrieve product family with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductFamilyById(req, res) {
        try {
            const updatedProductFamily = await productFamilyService.updateProductFamilyById(req.params.id, req.body);
            console.log(`Log::Successfully updated product family with ID: '${req.params.id}'`);
            res.status(200).json(updatedProductFamily);
        } catch (error) {
            console.error(`Log::Failed to update product family with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProductFamilyById(req, res) {
        try {
            const deletedProductFamily = await productFamilyService.deleteProductFamilyById(req.params.id);
            console.log(`Log::Successfully deleted product family with ID: '${req.params.id}'`);
            res.status(200).json(deletedProductFamily);
        } catch (error) {
            console.error(`Log::Failed to delete product family with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProductFamilyController();
