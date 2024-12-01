const productSizeService = require('../services/productSizeService');

class ProductSizeController {
    async createProductSize(req, res) {
        try {
            const productSize = await productSizeService.createProductSize(req.body);
            console.log(`Log::Successfully created product size with id: '${productSize.id}'`);
            res.status(200).json(productSize);
        } catch (error) {
            console.error(`Log::Failed to create product size with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProductSizes(req, res) {
        try {
            const productSizes = await productSizeService.getAllProductSizes();
            console.log(`Log::Successfully retrieved all product sizes`);
            res.status(200).json(productSizes);
        } catch (error) {
            console.error(`Log::Failed to retrieve all product sizes with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getProductSizeById(req, res) {
        try {
            const productSize = await productSizeService.getProductSizeById(req.params.id);
            console.log(`Log::Successfully retrieved product size with id: '${req.params.id}'`);
            res.status(200).json(productSize);
        } catch (error) {
            console.error(`Log::Failed to retrieve product size with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductSizeById(req, res) {
        try {
            const updatedProductSize = await productSizeService.updateProductSizeById(req.params.id, req.body);
            console.log(`Log::Successfully updated product size with id: '${req.params.id}'`);
            res.status(200).json(updatedProductSize);
        } catch (error) {
            console.error(`Log::Failed to update product size with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProductSizeById(req, res) {
        try {
            const deletedProductSize = await productSizeService.deleteProductSizeById(req.params.id);
            console.log(`Log::Successfully deleted product size with id: '${req.params.id}'`);
            res.status(200).json(deletedProductSize);
        } catch (error) {
            console.error(`Log::Failed to delete product size with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProductSizeController();
