const mainWarehouseStockService = require('../services/mainWarehouseStockServices');

class MainWarehouseStockController {
    async addProductsToMainWarehouseStock(req, res) {
        try {
            const addedProducts = await mainWarehouseStockService.addProductsToMainWarehouseStock(req.body);
            console.log(`Log::Successfully added products to main warehouse stock with ids and quantities: '${JSON.stringify(addedProducts)}'`);
            res.status(200).json(addedProducts);
        } catch (error) {
            console.log(`Log::Failed to add products to main warehouse stock with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllMainWarehouseStocksProducts(req, res) {
        try {
            const mainWarehouseStockProducts = await mainWarehouseStockService.getAllMainWarehouseStocksProducts();
            console.log(`Log::Successfully retrieved all main warehouse stock products`);
            res.status(200).json(mainWarehouseStockProducts);
        } catch (error) {
            console.log(`Log::Failed to retrieve all main warehouse stock products`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductsQuantities(req, res) {
        try {
            const updatedMainWarehouseStock = await mainWarehouseStockService.updateProductsQuantities(req.body);
            console.log(`Log::Successfully updated main warehouse stock quantities for products with ids: '${req.body}'`);
            res.status(200).json(updatedMainWarehouseStock);
        } catch (error) {
            console.error(`Log::Failed to update main warehouse stock quantities for products with ids '${req.body}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async removeProductFromMainWarehouseStock(req, res) {
        try {
            const removedProduct = await mainWarehouseStockService.removeProductFromMainWarehouseStock(req.body);
            console.log(`Log::Successfully removed from main warehouse stock the product with ID: '${req.body}'`);
            res.status(200).json(removedProduct);
        } catch (error) {
            console.error(`Log::Failed to delete from main warehouse stock the product with ID '${req.body}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new MainWarehouseStockController();