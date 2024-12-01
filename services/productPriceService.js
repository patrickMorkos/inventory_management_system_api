const ProductPrice = require('../models/ProductPrice');

class ProductPriceService {
    async createProductPrice(data) {
        let newProductPrice = await ProductPrice.create({ ...data });
        return newProductPrice;
    }

    async getAllProductPrices() {
        const productPrices = await ProductPrice.findAll();
        return productPrices;
    }

    async getProductPriceById(id) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid product price ID.');
        }
        const productPrice = await ProductPrice.findOne({ where: { id } });
        if (!productPrice) {
            throw new Error('Product price not found.');
        }
        return productPrice;
    }

    async updateProductPriceById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid product price ID.');
        }
        const productPrice = await ProductPrice.findOne({ where: { id } });
        if (!productPrice) {
            throw new Error('Product price not found.');
        }
        let updatedProductPrice = await productPrice.update(data);
        return updatedProductPrice;
    }

    async deleteProductPriceById(id) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid product price ID.');
        }
        const productPrice = await ProductPrice.findOne({ where: { id } });
        if (!productPrice) {
            throw new Error('Product price not found.');
        }
        let productPriceDeletion = await ProductPrice.destroy({ where: { id } });
        if (productPriceDeletion === 1) {
            productPriceDeletion = {
                status: 200,
                mssg: `Successfully deleted product price with ID: '${id}'`,
            };
        }
        return productPriceDeletion;
    }
}

module.exports = new ProductPriceService();
