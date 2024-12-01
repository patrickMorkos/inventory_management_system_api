const productPriceService = require('../services/productPriceService');

class ProductPriceController {
    async createProductPrice(req, res) {
        try {
            const productPrice = await productPriceService.createProductPrice(req.body);
            console.log(`Log::Successfully created product price with id: '${productPrice.id}'`);
            res.status(200).json(productPrice);
        } catch (error) {
            console.log(`Log::Failed to create product price with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProductPrices(req, res) {
        try {
            const productPrices = await productPriceService.getAllProductPrices();
            console.log('Log::Successfully retrieved all product prices');
            res.status(200).json(productPrices);
        } catch (error) {
            console.log('Log::Failed to retrieve product prices');
            res.status(400).json({ error: error.message });
        }
    }

    async getProductPriceById(req, res) {
        try {
            const productPrice = await productPriceService.getProductPriceById(req.params.id);
            console.log(`Log::Successfully retrieved product price with id: '${req.params.id}'`);
            res.status(200).json(productPrice);
        } catch (error) {
            console.log(`Log::Failed to retrieve product price with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductPriceById(req, res) {
        try {
            const updatedProductPrice = await productPriceService.updateProductPriceById(req.params.id, req.body);
            console.log(`Log::Successfully updated product price with ID: '${req.params.id}'`);
            res.status(200).json(updatedProductPrice);
        } catch (error) {
            console.error(`Log::Failed to update product price with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProductPriceById(req, res) {
        try {
            const deletedProductPrice = await productPriceService.deleteProductPriceById(req.params.id);
            console.log(`Log::Successfully deleted product price with ID: '${req.params.id}'`);
            res.status(200).json(deletedProductPrice);
        } catch (error) {
            console.error(`Log::Failed to delete product price with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProductPriceController();
