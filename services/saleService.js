
const Sale = require('../models/Sale');
const User = require('../models/User');
const Product = require('../models/Product');
const VanProducts = require('../models/VanProducts');
const Client = require('../models/Client');
const ProductPrice = require('../models/ProductPrice');
const SaleProducts = require('../models/SaleProducts');
const vanProductsService = require('./vanProductsService');
const Brand = require('../models/Brand');
const SaleType = require('../models/SaleType');
const MainWarehouseStock = require('../models/MainWarehouseStock');

class SaleService {
    async createSale(user_id, data) {
        try {
            const salesman = await User.findOne({ where: { id: user_id } });
            if (!salesman) {
                throw new Error('Salesman not found');
            }

            if (!data.client_id) {
                throw new Error('Client ID is required');
            }

            const client = await Client.findOne({ where: { id: data.client_id } });
            if (!client) {
                throw new Error('Client not found');
            }

            if (!data.products || !Array.isArray(data.products) || data.products.length === 0) {
                throw new Error('Sale products are required');
            }

            let productList = [];
            let inventoryModel = null;

            // Determine inventory source based on sale_type_id
            if (data.sale_type_id === 1) {
                inventoryModel = VanProducts;
            } else if (data.sale_type_id === 2) {
                inventoryModel = MainWarehouseStock;
            } else {
                throw new Error('Invalid sale_type_id');
            }

            // Validate sale products
            for (const item of data.products) {
                if (!item.product_id || !item.quantity || !item.product_price) {
                    throw new Error('Product ID, quantity, and price are required');
                }

                const product = await inventoryModel.findOne({
                    where: {
                        product_id: item.product_id,
                        ...(data.sale_type_id === 1 ? { user_id: user_id } : {}) // Ensure user_id filter for van sales
                    }
                });

                if (!product) {
                    throw new Error(`Product with id ${item.product_id} not found in inventory`);
                }

                if (item.quantity > product.quantity) {
                    throw new Error(`Insufficient quantity for product ${item.product_id}`);
                }

                productList.push(product);
            }

            // Calculate price without VAT
            let totalPriceWithoutVatUsd = (data.total_price_usd / (1 + data.vat_value / 100)).toFixed(2);
            let totalPriceWithoutVatLbp = (data.total_price_lbp / (1 + data.vat_value / 100)).toFixed(2);

            let dueDate = data.is_pending_payment ? null : new Date();
            data.issue_date = new Date();

            // Create sale
            const sale = await Sale.create({
                user_id: Number(user_id),
                client_id: Number(data.client_id),
                total_price_usd: Number(data.total_price_usd),
                total_price_lbp: Number(data.total_price_lbp),
                vat_value: Number(data.vat_value),
                total_price_without_vat_usd: Number(totalPriceWithoutVatUsd),
                total_price_without_vat_lbp: Number(totalPriceWithoutVatLbp),
                issue_date: data.issue_date,
                due_date: dueDate,
                is_pending_payment: data.is_pending_payment,
                invoice_pdf_url: null,
                sale_type_id: Number(data.sale_type_id),
            });

            // Create sale products
            let saleProducts = [];
            for (const item of data.products) {
                let saleProduct = await SaleProducts.create({
                    sale_id: sale.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    product_price: item.product_price,
                });

                saleProducts.push({
                    product_id: saleProduct.product_id,
                    quantity: saleProduct.quantity,
                    product_price: saleProduct.product_price,
                });
            }

            sale.dataValues.products = saleProducts;

            // Decrease product quantities in the corresponding inventory
            for (const product of productList) {
                for (const saleProduct of data.products) {
                    if (product.product_id === saleProduct.product_id) {
                        product.quantity -= saleProduct.quantity; // Correct subtraction
                    }
                }
            }

            // Update product quantities in the correct inventory
            if (data.sale_type_id === 1) {
                // Update VanProducts directly
                await Promise.all(productList.map(async (product) => {
                    await VanProducts.update(
                        { quantity: product.quantity },
                        { where: { product_id: product.product_id, user_id: user_id } }
                    );
                }));
            } else if (data.sale_type_id === 2) {
                // Update MainWarehouseStock correctly
                await Promise.all(productList.map(async (product) => {
                    await MainWarehouseStock.update(
                        { quantity: product.quantity },
                        { where: { product_id: product.product_id } }
                    );
                }));
            }

            // TODO: Add invoice PDF URL

            return sale;
        } catch (error) {
            throw new Error(`Failed to create sale: ${error.message}`);
        }
    }

    async deleteSaleById(id) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid sale ID.');
        }
        let sale = await Sale.findByPk(id);
        if (!sale) {
            throw new Error('Sale not found');
        }

        //Increase van products quantity
        let vanProductList = await VanProducts.findAll({ where: { user_id: sale.user_id } });
        let data = await SaleProducts.findAll({ where: { sale_id: id } });
        for (const vanProduct of vanProductList) {
            for (const saleProduct of data) {
                if (vanProduct.product_id === saleProduct.product_id) {
                    vanProduct.quantity = vanProduct.quantity + saleProduct.quantity;
                }
            }
        }

        // Update van products quantity
        await vanProductsService.updateVanProductsQuantities(sale.user_id, vanProductList);

        //Delete sale products
        await SaleProducts.destroy({ where: { sale_id: id } });

        //Delete sale
        await Sale.destroy({ where: { id } });

        return {
            status: 'success',
            message: 'Sale deleted successfully',
        }

    }

    async updateSaleById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid sale ID.');
        }
        let sale = await Sale.findByPk(id);
        if (!sale) {
            throw new Error('Sale not found');
        }

        let updatedSaleData = data;

        if (data.vat_value && data.total_price_usd && data.total_price_lbp) {
            data.total_price_without_vat_usd = (data.total_price_usd / (1 + data.vat_value / 100)).toFixed(2);
            data.total_price_without_vat_lbp = (data.total_price_lbp / (1 + data.vat_value / 100)).toFixed(2);
            updatedSaleData.total_price_without_vat_usd = Number(data.total_price_without_vat_usd);
            updatedSaleData.total_price_without_vat_lbp = Number(data.total_price_without_vat_lbp);
        }

        if (data.is_pending_payment != null) {
            if (data.is_pending_payment) {
                data.due_date = null;
                updatedSaleData.due_date = null;
            } else {
                data.due_date = new Date();
                updatedSaleData.due_date = data.due_date;
            }
        }

        //Increase van products quantity
        if (data.products) {
            let vanProducts = await VanProducts.findAll({ where: { user_id: sale.user_id } });
            let saleProducts = await SaleProducts.findAll({ where: { sale_id: id } });
            let updatedSaleProducts = [];
            let updatedVanProducts = [];
            for (const vanProduct of vanProducts) {
                for (const saleProduct of saleProducts) {
                    for (const product of data.products) {
                        if (product.product_id === saleProduct.product_id && saleProduct.product_id === vanProduct.product_id) {
                            if (product.quantity > vanProduct.quantity) {
                                throw new Error(`Not enough products in the van for product: ${product.product_id} and quantity: ${product.quantity}`);
                            }
                            if (product.quantity < saleProduct.quantity) {
                                //decrease sale product quantity
                                let decreasedSaleQuantity = saleProduct.quantity - product.quantity;
                                saleProduct.quantity = saleProduct.quantity - decreasedSaleQuantity;
                                updatedSaleProducts.push(saleProduct);
                                //increase van product quantity
                                let increasedVanQuantity = vanProduct.quantity + decreasedSaleQuantity;
                                vanProduct.quantity = increasedVanQuantity;
                                updatedVanProducts.push(vanProduct);
                            } else if (product.quantity > saleProduct.quantity) {
                                //decrease van product quantity
                                let decreasedVanQuantity = vanProduct.quantity - product.quantity + saleProduct.quantity;
                                vanProduct.quantity = decreasedVanQuantity;
                                //increase sale product quantity
                                saleProduct.quantity = product.quantity;
                                updatedSaleProducts.push(saleProduct);
                                updatedVanProducts.push(vanProduct);
                            } else {
                                updatedSaleProducts.push(saleProduct);
                                updatedVanProducts.push(vanProduct);
                            }
                        }
                    }
                }
            }
            for (const vanProduct of updatedVanProducts) {
                await vanProduct.save();
            }

            for (const saleProduct of updatedSaleProducts) {
                await saleProduct.save();
            }
            updatedSaleData.products = updatedSaleProducts;
        }

        await Sale.update(updatedSaleData, { where: { id } });

        return updatedSaleData;
    }

    async getAllClientSales(user_id, client_id) {
        const sales = await Sale.findAll({
            where: { user_id: user_id, client_id: client_id },
            attributes: [
                "id",
                "total_price_usd",
                "total_price_lbp",
                "issue_date",
                "due_date",
                "is_pending_payment",
                "invoice_pdf_url",
            ],
            include: [
                {
                    model: SaleType,
                }
            ]
        });

        for (const sale of sales) {
            sale.dataValues.products = await SaleProducts.findAll({
                where: { sale_id: sale.id },
                attributes: [
                    "quantity", "product_price"
                ],
                include: [
                    {
                        model: Product,
                        attributes: [
                            "id",
                            "name",
                            "image_url",
                        ],
                        include: [
                            {
                                model: Brand,
                                attributes: [
                                    "brand_name",
                                ],
                            }
                        ]
                    }
                ]
            });
        }
        return sales;
    }
}

module.exports = new SaleService();
