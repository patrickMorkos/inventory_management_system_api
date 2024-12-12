const MainWarehouseStock = require('../models/MainWarehouseStock');
const Product = require('../models/Product');
const Category = require('../models/Category');

class MainWarehouseStockService {
    async addProductsToMainWarehouseStock(data) {
        try {
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

                const product = await Product.findOne({ where: { id: element.product_id } });
                if (product === null) {
                    console.log("Product not found");
                    throw new Error(`Product with id ${element.product_id} not found`);
                }

                if (uniqueProductIds.has(element.product_id)) {
                    throw new Error(`Duplicate product with id '${element.product_id}' found in the request`);
                }
                uniqueProductIds.add(element.product_id);
            }

            const productIds = data.map((item) => item.product_id);
            const existingEntries = await MainWarehouseStock.findAll({
                where: {
                    product_id: productIds,
                },
            });

            const existingProductIds = new Set(existingEntries.map((entry) => entry.product_id));
            console.log("Existing product IDs:", existingProductIds);

            existingProductIds.forEach((productId) => {
                throw new Error(`Product with id ${productId} already exists in your main warehouse stock`);
            });

            const addedProducts = await MainWarehouseStock.bulkCreate(data);
            return addedProducts;
        } catch (error) {
            throw new Error(`Failed to add product to main warehouse stock: ${error.message}`);
        }
    }

    async getAllMainWarehouseStocksProducts() {
        try {
            const mainWarehouseStocks = await MainWarehouseStock.findAll({
                include: [{
                    model: Product,
                    attributes: ['id', 'name', 'image_url']
                }],
                attributes: ['quantity']
            });
            return mainWarehouseStocks;
        } catch (error) {
            throw new Error(`Failed to retrieve main warehouse stocks: ${error.message}`);
        }
    }

    async updateProductsQuantities(data) {
        try {
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

                const product = await MainWarehouseStock.findOne({ where: { product_id: element.product_id } });
                if (product === null) {
                    console.log("Product not found");
                    throw new Error(`Product with id ${element.product_id} not found in your stock`);
                }
            }
            const updates = await Promise.all(data.map(async (item) => {
                return await MainWarehouseStock.update(
                    { quantity: item.quantity },
                    {
                        where: { product_id: item.product_id },
                    }
                );
            }));

            if (updates.some(update => update[0] === 0)) {
                return { error: 'Some products not found' };
            } else {
                return { message: 'The below Products quantities updated successfully', products: data };
            }
        } catch (error) {
            throw new Error(`Failed to update main warehouse stock products quantities: ${error.message}`);
        }
    }

    async removeProductFromMainWarehouseStock(data) {
        try {
            const product = await MainWarehouseStock.findOne({ where: { product_id: data.product_id } });
            if (product === null) {
                console.log("Product not found");
                throw new Error(`Product with id ${data.product_id} not found in your stock`);
            }
            await product.destroy();
            return product;
        } catch (error) {
            throw new Error(`Failed to remove product from main warehouse: ${error.message}`);
        }
    }

    async getMainWarehouseStockCategories() {
        try {
            const mainWarehouseCategories = await MainWarehouseStock.findAll({
                include: [
                    {
                        model: Product,
                        attributes: [],
                        include: [
                            {
                                model: Category,
                                attributes: ['id', 'category_name', 'category_image_url']
                            }
                        ]
                    }
                ],
                attributes: [],
                group: ['Product->Category.id'],
                raw: true
            });

            const transformedCategories = mainWarehouseCategories.map(item => ({
                id: item['Product.Category.id'],
                category_name: item['Product.Category.category_name'],
                category_image_url: item['Product.Category.category_image_url']
            }));

            return transformedCategories;
        } catch (error) {
            throw new Error(`Failed to retrieve main warehouse stocks: ${error.message}`);
        }
    }
}

module.exports = new MainWarehouseStockService();