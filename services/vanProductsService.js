const VanProducts = require('../models/VanProducts');
const Product = require('../models/Product');
const User = require('../models/User');

class VanProductsService {
    async addProductsToVan(user_id, data) {
        try {
            const salesman = await User.findOne({ where: { id: user_id } });
            if (!salesman) {
                throw new Error('Salesman not found');
            }

            const uniqueProductIds = new Set();
            for (const element of data) {
                if (!element.product_id) {
                    throw new Error('Product ID is required');
                }
                if (element.quantity === undefined || element.quantity === null) {
                    throw new Error('Quantity is required');
                }
                if (element.quantity < 0) {
                    throw new Error('Quantity must be greater than 0');
                }

                if (uniqueProductIds.has(element.product_id)) {
                    throw new Error(`Duplicate product with id '${element.product_id}' found in the request`);
                }
                uniqueProductIds.add(element.product_id);

                const product = await Product.findOne({ where: { id: element.product_id } });
                if (!product) {
                    throw new Error(`Product with id ${element.product_id} not found`);
                }
            }

            const productIds = data.map((item) => item.product_id);
            const existingEntries = await VanProducts.findAll({
                where: {
                    user_id,
                    product_id: productIds,
                },
            });

            const existingProductIds = new Set(existingEntries.map((entry) => entry.product_id));
            console.log("Existing product IDs:", existingProductIds);

            existingProductIds.forEach((productId) => {
                throw new Error(`Product with id ${productId} already exists in your van`);
            });

            const newEntries = data.filter((item) => !existingProductIds.has(item.product_id));

            newEntries.forEach((item) => {
                item.user_id = user_id;
            });

            const addedProducts = await VanProducts.bulkCreate(newEntries, { returning: true });
            return addedProducts;
        } catch (error) {
            throw new Error(`Failed to add product to van: ${error.message}`);
        }
    }

    async getAllVanProducts(user_id) {
        try {
            const salesman = await User.findOne({ where: { id: user_id } });
            if (!salesman) {
                throw new Error('Salesman not found');
            }
            const vanProducts = await VanProducts.findAll({
                where: { user_id: user_id },
                include: [
                    {
                        model: Product,
                        attributes: ['id', 'name', 'image_url']
                    },
                    {
                        model: User,
                        attributes: ['id', 'first_name', 'last_name']
                    }
                ],
                attributes: ['quantity']
            });
            return vanProducts;
        } catch (error) {
            throw new Error(`Failed to retrieve van products: ${error.message}`);
        }
    }

    async updateVanProductsQuantities(user_id, data) {
        try {
            const salesman = await User.findOne({ where: { id: user_id } });
            if (!salesman) {
                throw new Error('Salesman not found');
            }
            for (const element of data) {
                if (!element.product_id) {
                    throw new Error('Product ID is required');
                }
                if (element.quantity === undefined || element.quantity === null) {
                    throw new Error('Quantity is required');
                }
                if (element.quantity < 0) {
                    throw new Error('Quantity must be greater than 0');
                }

                const product = await VanProducts.findOne({ where: { product_id: element.product_id } });
                if (product === null) {
                    console.log("Product not found");
                    throw new Error(`Product with id ${element.product_id} not found in your van`);
                }
            }
            const updates = await Promise.all(data.map(async (item) => {
                return await VanProducts.update(
                    { quantity: item.quantity },
                    {
                        where: { product_id: item.product_id, user_id: user_id },
                    }
                );
            }));

            if (updates.some(update => update[0] === 0)) {
                return { error: 'Some products not found' };
            } else {
                return { message: 'The below Products quantities updated successfully', products: data };
            }
        } catch (error) {
            throw new Error(`Failed to update van products quantities: ${error.message}`);
        }
    }

    async removeProductFromVan(user_id, data) {
        try {
            const salesman = await User.findOne({ where: { id: user_id } });
            if (!salesman) {
                throw new Error('Salesman not found');
            }
            const product = await VanProducts.findOne({ where: { product_id: data.product_id, user_id: user_id } });
            if (product === null) {
                console.log("Product not found");
                throw new Error(`Product with id ${data.product_id} not found in your van`);
            }
            await product.destroy();
            return product;
        } catch (error) {
            throw new Error(`Failed to remove product from van: ${error.message}`);
        }
    }
}

module.exports = new VanProductsService();
