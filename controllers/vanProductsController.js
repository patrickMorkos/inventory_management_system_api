const vanProductsService = require('../services/vanProductsService');

class VanProductsController {
    async addProductsToVan(req, res) {
        try {
            const addedProducts = await vanProductsService.addProductsToVan(req.params.user_id, req.body);
            console.log(`Log::Successfully added products to van with ids and quantities: '${JSON.stringify(addedProducts)}'`);
            res.status(200).json(addedProducts);
        } catch (error) {
            console.log(`Log::Failed to add products to van with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllVanProducts(req, res) {
        try {
            const vanProducts = await vanProductsService.getAllVanProducts(req.params.user_id);
            console.log(`Log::Successfully retrieved all van products`);
            res.status(200).json(vanProducts);
        } catch (error) {
            console.log(`Log::Failed to retrieve all van products`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateVanProductsQuantities(req, res) {
        try {
            const updatedVanProducts = await vanProductsService.updateVanProductsQuantities(req.params.user_id, req.body);
            console.log(`Log::Successfully updated van products quantities for products with ids: '${req.body}'`);
            res.status(200).json(updatedVanProducts);
        } catch (error) {
            console.error(`Log::Failed to update van products quantities for products with ids '${req.body}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async removeProductFromVan(req, res) {
        try {
            const removedProduct = await vanProductsService.removeProductFromVan(req.params.user_id, req.body);
            console.log(`Log::Successfully removed from van the product with ID: '${req.body}'`);
            res.status(200).json(removedProduct);
        } catch (error) {
            console.error(`Log::Failed to delete from van the product with ID '${req.body}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new VanProductsController();
