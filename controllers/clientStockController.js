const clientStockService = require('../services/clientStockService');

class ClientStockController {
    async addProductsToClientStock(req, res) {
        try {
            const addedProducts = await clientStockService.addProductsToClientStock(req);
            console.log(`Log::Successfully added products to client stock: '${JSON.stringify(addedProducts)}'`);
            res.status(200).json(addedProducts);
        } catch (error) {
            console.log(`Log::Failed to add products to client stock: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllClientStocksProducts(req, res) {
        try {
            const client_id = req.params.client_id;
            const clientStockProducts = await clientStockService.getAllClientStocksProducts(client_id);
            console.log('Log::Successfully retrieved all client stock products');
            res.status(200).json(clientStockProducts);
        } catch (error) {
            console.log('Log::Failed to retrieve client stock products');
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const client_id = req.params.client_id;
            const updatedClientStock = await clientStockService.updateProductQuantity(req.body, client_id);
            console.log(`Log::Successfully updated client stock quantities: '${req.body}'`);
            res.status(200).json(updatedClientStock);
        } catch (error) {
            console.log(`Log::Failed to update client stock quantities: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async removeProductFromClientStock(req, res) {
        try {
            const client_id = req.params.client_id;
            const removedProduct = await clientStockService.removeProductFromClientStock(req.body, client_id);
            console.log(`Log::Successfully removed product from client stock: '${req.body}'`);
            res.status(200).json(removedProduct);
        } catch (error) {
            console.log(`Log::Failed to remove product from client stock: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ClientStockController();