const returnedProductsService = require('../services/returnedProductsService');
const User = require('../models/User');
const Client = require('../models/Client');
const Product = require('../models/Product');
const ClientStock = require('../models/ClientStock');

class ReturnedProductsController {
    async createReturnedProductsReason(req, res) {
        try {
            const reason = await returnedProductsService.createReturnedProductsReason(req.body);
            res.status(200).json(reason);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllReturnedProductsReasons(req, res) {
        try {
            const reasons = await returnedProductsService.getAllReturnedProductsReasons();
            res.status(200).json(reasons);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteReturnedProductsReason(req, res) {
        try {
            const result = await returnedProductsService.deleteReturnedProductsReason(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createReturnedProduct(req, res) {
        try {
            const user_id = req.params.user_id;
            const { client_id, product_id, quantity, returned_product_reason_id } = req.body;

            // Validate user_id
            console.log("user_id:", user_id);
            const user = await User.findByPk(user_id);
            console.log("user:", user);
            if (!user) throw new Error("Invalid user ID.");

            // Validate client_id
            const client = await Client.findByPk(client_id);
            if (!client) throw new Error("Invalid client ID.");

            // Validate product_id and client stock
            const clientStock = await ClientStock.findOne({ where: { client_id, product_id } });
            if (!clientStock) throw new Error("Product not found in client stock.");
            if (quantity > clientStock.quantity) throw new Error("Return quantity exceeds available stock.");

            const returnedProduct = await returnedProductsService.createReturnedProduct(user_id, client_id, product_id, quantity, returned_product_reason_id);
            res.status(200).json(returnedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllReturnedProducts(req, res) {
        try {
            const user_id = req.params.user_id;
            const client_id = req.query.client_id;

            // Validate user_id
            const user = await User.findByPk(user_id);
            if (!user) throw new Error("Invalid user ID.");

            const returnedProducts = await returnedProductsService.getAllReturnedProducts(user_id, client_id);
            res.status(200).json(returnedProducts);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ReturnedProductsController();