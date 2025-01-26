const ClientStock = require('../models/ClientStock');
const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Client = require('../models/Client');
const { Sequelize } = require('sequelize');

class ClientStockService {
    async addProductsToClientStock(req, res) {
        try {
            const client_id = req.params.client_id;
            const product = req.body;

            if (!client_id) {
                throw new Error('Client ID is required');
            }

            // Validate client existence
            const client = await Client.findOne({ where: { id: client_id } });
            if (!client) {
                throw new Error(`Client with ID ${client_id} not found`);
            }

            // Validate product details
            if (!product.product_id || product.quantity === undefined || product.quantity === null || product.quantity < 0) {
                throw new Error('The product must have a valid product_id and quantity (greater than or equal to 0)');
            }

            // Check if the product exists in the Product table
            const productExists = await Product.findOne({ where: { id: product.product_id } });
            if (!productExists) {
                throw new Error(`Product with ID ${product.product_id} does not exist in the Product table.`);
            }

            // Check if the product already exists in the client stock
            const existingProduct = await ClientStock.findOne({
                where: { client_id, product_id: product.product_id }
            });
            if (existingProduct) {
                throw new Error(`Product with ID ${product.product_id} already exists in the client stock. Consider updating its quantity.`);
            }

            // Add product to the client stock
            const addedProduct = await ClientStock.create({
                client_id,
                product_id: product.product_id,
                quantity: product.quantity
            });

            return {
                message: 'Product added to client stock successfully',
                product: addedProduct
            };

        } catch (error) {
            throw new Error(`Failed to add product to client stock: ${error.message}`);
        }
    }



    async getAllClientStocksProducts(client_id) {
        try {
            if (!client_id) {
                throw new Error('Client ID is required');
            }
            // Validate client existence
            const client = await Client.findOne({ where: { id: client_id } });
            if (!client) {
                throw new Error(`Client with ID ${client_id} not found`);
            }
            const clientStockProducts = await ClientStock.findAll({
                where: client_id ? { client_id } : {},
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'image_url'],
                    include: [{
                        model: Brand,
                        attributes: ['id', 'brand_name']
                    }]
                }],
                attributes: ['quantity'],
            });
            return clientStockProducts;
        } catch (error) {
            throw new Error(`Failed to retrieve client stock products: ${error.message}`);
        }
    }

    async updateProductQuantity(data, client_id) {
        try {
            if (!client_id) {
                throw new Error('Client ID is required');
            }

            // Validate client existence
            const client = await Client.findOne({ where: { id: client_id } });
            if (!client) {
                throw new Error(`Client with ID ${client_id} not found`);
            }

            if (!data.product_id || data.quantity === undefined || data.quantity === null || data.quantity < 0) {
                throw new Error('The data object must have a valid product_id and quantity (greater than or equal to 0)');
            }

            // Check if the product exists in the client stock
            const stockEntry = await ClientStock.findOne({ where: { client_id, product_id: data.product_id } });
            if (!stockEntry) {
                throw new Error(`Product with ID ${data.product_id} does not exist in the client stock for Client ID ${client_id}`);
            }

            // Update the product quantity
            await ClientStock.update(
                { quantity: data.quantity },
                { where: { client_id, product_id: data.product_id } }
            );

            return { message: 'Product quantity updated successfully', product: data };
        } catch (error) {
            throw new Error(`Failed to update client stock quantity: ${error.message}`);
        }
    }



    async removeProductFromClientStock(data, client_id) {
        try {
            if (!client_id) {
                throw new Error('Client ID is required');
            }

            // Validate client existence
            const client = await Client.findOne({ where: { id: client_id } });
            if (!client) {
                throw new Error(`Client with ID ${client_id} not found`);
            }

            if (!data.product_id) {
                throw new Error('Product ID is required');
            }

            // Check if the product exists in the client stock
            const stockEntry = await ClientStock.findOne({ where: { client_id, product_id: data.product_id } });
            if (!stockEntry) {
                throw new Error(`Product with ID ${data.product_id} does not exist in the client stock for Client ID ${client_id}`);
            }

            await stockEntry.destroy();
            return stockEntry;
        } catch (error) {
            throw new Error(`Failed to remove product from client stock: ${error.message}`);
        }
    }

}

module.exports = new ClientStockService();
