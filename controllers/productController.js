const productService = require('../services/productService');

class ProductController {
    async createProduct(req, res) {
        try {
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                req.body.image_url = `${baseUrl}/uploads/${req.file.filename}`;
            }
            const product = await productService.createProduct(req.body);
            console.log(`Log::Successfully created product with id: '${product.id}'`);
            res.status(200).json(product);
        } catch (error) {
            console.log(`Log::Failed to create product with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            console.log(`Log::Successfully retrieved all products`);
            res.status(200).json(products);
        } catch (error) {
            console.log(`Log::Failed to retrieve all products`);
            res.status(400).json({ error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            console.log(`Log::Successfully retrieved product with id: '${req.params.id}'`);
            res.status(200).json(product);
        } catch (error) {
            console.log(`Log::Failed to retrieve product with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateProductById(req, res) {
        try {
            if (req.file) {
                const baseUrl = `${req.protocol}://${req.get('host')}`;
                req.body.image_url = `${baseUrl}/uploads/${req.file.filename}`;
            }
            const updatedProduct = await productService.updateProductById(req.params.id, req.body);
            console.log(`Log::Successfully updated product with ID: '${req.params.id}'`);
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(`Log::Failed to update product with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProductById(req, res) {
        try {
            const deletedProduct = await productService.deleteProductById(req.params.id);
            console.log(`Log::Successfully deleted product with ID: '${req.params.id}'`);
            res.status(200).json(deletedProduct);
        } catch (error) {
            console.error(`Log::Failed to delete product with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ProductController();
