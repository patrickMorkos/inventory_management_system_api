const ReturnedProductsReason = require('../models/ReturnedProductReason');
const ReturnedProducts = require('../models/ReturnedProducts');
const ClientStock = require('../models/ClientStock');
const VanProducts = require('../models/VanProducts');
const Product = require('../models/Product');

class ReturnedProductsService {
    async createReturnedProductsReason(data) {
        const reason = await ReturnedProductsReason.create(data);
        return reason;
    }

    async getAllReturnedProductsReasons() {
        return await ReturnedProductsReason.findAll();
    }

    async deleteReturnedProductsReason(id) {
        const deleted = await ReturnedProductsReason.destroy({ where: { id } });
        if (!deleted) throw new Error("Reason not found.");
        return { message: "Successfully deleted reason." };
    }

    async createReturnedProduct(user_id, client_id, product_id, quantity, returned_product_reason_id) {
        try {
            // Generate returned date
            const returnedDate = new Date();

            // Insert into returned_products
            const returnedProduct = await ReturnedProducts.create({
                returned_date: returnedDate,
                product_id,
                client_id,
                user_id,
                returned_product_reason_id,
            });

            // Deduct quantity from client_stock
            const clientStock = await ClientStock.findOne({ where: { client_id, product_id } });
            await clientStock.update({ quantity: clientStock.quantity - quantity });

            // Increase quantity in van_products
            const vanProduct = await VanProducts.findOne({ where: { user_id, product_id } });
            if (vanProduct) {
                await vanProduct.update({ quantity: vanProduct.quantity + quantity });
            } else {
                await VanProducts.create({ user_id, product_id, quantity });
            }

            return returnedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllReturnedProducts(user_id, client_id) {
        const whereClause = { user_id };
        if (client_id) whereClause.client_id = client_id;

        return await ReturnedProducts.findAll({
            where: whereClause,
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'image_url'],
                },
            ],
        });
    }
}

module.exports = new ReturnedProductsService();
