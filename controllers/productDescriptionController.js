const productDescriptionService = require('../services/productDescriptionService');

class ProductDescriptionController {
    async createProductDescription(req, res) {
        try {
            const productDescription = await productDescriptionService.createProductDescription(req.body);
            console.log(`Log::Successfully created product description with id: '${productDescription.id}'`);
            res.status(200).json(productDescription);
        } catch (error) {
            console.error(`Log::Failed to create product description: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProductDescriptions(req, res) {
        try {
            const productDescriptions = await productDescriptionService.getAllProductDescriptions();
            console.log(`Log::Successfully retrieved all product descriptions`);
            res.status(200).json(productDescriptions);
        } catch (error) {
            console.error(`Log::Failed to retrieve product descriptions: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getProductDescriptionById(req, res) {
        try {
            const productDescription = await productDescriptionService.getProductDescriptionById(req.params.id);
            console.log(`Log::Successfully retrieved product description with id: '${req.params.id}'`);
            res.status(200).json(productDescription);
        } catch (error) {
            console.error(`Log::Failed to retrieve product description with id '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductDescriptionById(req, res) {
        try {
            const updatedProductDescription = await productDescriptionService.updateProductDescriptionById(req.params.id, req.body);
            console.log(`Log::Successfully updated product description with ID: '${req.params.id}'`);
            res.status(200).json(updatedProductDescription);
        } catch (error) {
            console.error(`Log::Failed to update product description with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProductDescriptionById(req, res) {
        try {
            const deletedProductDescription = await productDescriptionService.deleteProductDescriptionById(req.params.id);
            console.log(`Log::Successfully deleted product description with ID: '${req.params.id}'`);
            res.status(200).json(deletedProductDescription);
        } catch (error) {
            console.error(`Log::Failed to delete product description with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProductDescriptionController();
