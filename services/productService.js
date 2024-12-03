const Product = require('../models/Product');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const ProductType = require('../models/ProductType');
const Whs = require('../models/Whs');
const ProductDescription = require('../models/ProductDescription');
const ProductPrice = require('../models/ProductPrice');
const ProductFamily = require('../models/ProductFamily');
const ProductSize = require('../models/ProductSize');

const { Op } = require('sequelize');

class ProductService {
    async createProduct(data) {
        // Check if a product with the same code, barcode, or hscod exists
        const { cod, barcod, hscod } = data;

        if (cod) {
            const existingCod = await Product.findOne({ where: { cod } });
            if (existingCod) {
                throw new Error('Product with this code already exists.');
            }
        }

        if (barcod) {
            const existingBarcod = await Product.findOne({ where: { barcod } });
            if (existingBarcod) {
                throw new Error('Product with this barcode already exists.');
            }
        }

        if (hscod) {
            const existingHscod = await Product.findOne({ where: { hscod } });
            if (existingHscod) {
                throw new Error('Product with this hscod already exists.');
            }
        }

        if (data.brand_id) {
            const brand = await Brand.findOne({ where: { id: data.brand_id } });
            if (!brand) throw new Error("Invalid brand_id: No brand found with this ID.");
        }

        if (data.category_id) {
            const category = await Category.findOne({ where: { id: data.category_id } });
            if (!category) throw new Error("Invalid category_id: No category found with this ID.");
        }

        if (data.product_type_id) {
            const productType = await ProductType.findOne({ where: { id: data.product_type_id } });
            if (!productType) throw new Error("Invalid product_type_id: No product type found with this ID.");
        }

        if (data.whs_id) {
            const whs = await Whs.findOne({ where: { id: data.whs_id } });
            if (!whs) throw new Error("Invalid whs_id: No whs found with this ID.");
        }

        if (data.product_family_id) {
            const productFamily = await ProductFamily.findOne({ where: { id: data.product_family_id } });
            if (!productFamily) throw new Error("Invalid product_family_id: No product family found with this ID.");
        }

        const descriptionObject = JSON.parse(data.product_description);
        const priceObject = JSON.parse(data.product_price);
        const sizeObject = JSON.parse(data.product_size);
        const productDescription = await ProductDescription.create(descriptionObject);
        const productPrice = await ProductPrice.create(priceObject);
        const productSize = await ProductSize.create(sizeObject);

        const newProduct = await Product.create({
            ...data,
            product_description_id: productDescription.id,
            product_price_id: productPrice.id,
            product_size_id: productSize.id,
        });

        return newProduct;
    }

    async getAllProducts() {
        const products = await Product.findAll({
            include: [
                { model: Brand },
                { model: Category },
                { model: ProductType },
                { model: Whs },
                { model: ProductDescription },
                { model: ProductPrice },
                { model: ProductFamily },
                { model: ProductSize }
            ],
        });

        return products;
    }

    async getProductById(id) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid product ID.');
        }
        const product = await Product.findOne({
            where: { id },
            include: [
                { model: Brand },
                { model: Category },
                { model: ProductType },
                { model: Whs },
                { model: ProductDescription },
                { model: ProductPrice },
                { model: ProductFamily },
                { model: ProductSize }
            ]
        });
        if (!product) {
            throw new Error('Product not found.');
        }
        return product;
    }

    async updateProductById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid product ID.');
        }
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found.');
        }

        // Optionally check for duplicate codes or barcodes during update
        if (data.cod || data.barcod) {
            const duplicateProduct = await Product.findOne({
                where: {
                    [Op.or]: [{ cod: data.cod }, { barcod: data.barcod }],
                    id: { [Op.ne]: id },
                },
            });
            if (duplicateProduct) {
                throw new Error('Another product with the same code or barcode exists.');
            }
        }

        const updatedProduct = await product.update(data);
        return updatedProduct;
    }

    async deleteProductById(id) {
        if (!id || isNaN(id)) {
            throw new Error('Invalid product ID.');
        }
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found.');
        }
        await Product.destroy({ where: { id } });
        return {
            status: 200,
            message: `Successfully deleted product with ID: '${id}'`,
        };
    }
}

module.exports = new ProductService();
