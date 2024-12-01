const brandService = require('../services/brandService');

class BrandController {
    async createBrand(req, res) {
        try {
            const brand = await brandService.createBrand(req.body);
            console.log(`Log::Successfully created brand with id: '${brand.id}'`)
            res.status(200).json(brand);
        } catch (error) {
            console.log(`Log::Failed to create brand with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }

    async getAllBrands(req, res) {
        try {
            const brands = await brandService.getAllBrands();
            console.log(`Log::Successfully retrieved all brands`)
            res.status(200).json(brands);
        } catch (error) {
            console.log(`Log::Failed to retrieve all brands`)
            res.status(400).json({ error: error.message });
        }
    }

    async getBrandById(req, res) {
        try {
            const brand = await brandService.getBrandById(req.params.id);
            console.log(`Log::Successfully retrieved brand with id: '${req.params.id}'`)
            res.status(200).json(brand);
        } catch (error) {
            console.log(`Log::Failed to retrieve brand with id '${req.params.id}' with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }

    async updateBrandById(req, res) {
        try {
            const updatedBrand = await brandService.updateBrandById(req.params.id, req.body);
            console.log(`Log::Successfully updated brand with ID: '${req.params.id}'`);
            res.status(200).json(updatedBrand);
        } catch (error) {
            console.error(`Log::Failed to update brand with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBrandById(req, res) {
        try {
            const deletedBrand = await brandService.deleteBrandById(req.params.id);
            console.log(`Log::Successfully deleted brand with ID: '${req.params.id}'`);
            res.status(200).json(deletedBrand);
        } catch (error) {
            console.error(`Log::Failed to delete brand with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BrandController();