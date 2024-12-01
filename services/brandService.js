const Brand = require('../models/Brand');

class BrandService {
    async createBrand(data) {
        let newBrand = await Brand.create({ ...data });
        return newBrand;
    }

    async getAllBrands() {
        const brands = await Brand.findAll();
        return brands;
    }

    async getBrandById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid brand ID.");
        }
        const brand = await Brand.findOne({ where: { id } });
        if (brand == null) {
            throw new Error("Brand not found.");
        }
        return brand;
    }

    async updateBrandById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid brand ID.");
        }
        const brand = await Brand.findOne({ where: { id } });
        if (brand == null) {
            throw new Error("Brand not found.");
        }
        let updatedBrand = await brand.update(data);
        return updatedBrand;
    }

    async deleteBrandById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid brand ID.");
        }
        const brand = await Brand.findOne({ where: { id } });
        if (brand == null) {
            throw new Error("Brand not found.");
        }
        let brand2 = await Brand.destroy({ where: { id: id } });
        if (brand2 == 1) {
            brand2 = {
                "status": 200,
                "mssg": `Successfully deleted brand with ID: '${id}'`
            }
        }
        return brand2;
    }

}

module.exports = new BrandService();