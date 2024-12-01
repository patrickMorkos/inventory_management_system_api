const Whs = require('../models/Whs');

class WhsService {
    async createWhs(data) {
        let newWhs = await Whs.create({ ...data });
        return newWhs;
    }

    async getAllWhs() {
        const whss = await Whs.findAll();
        return whss;
    }

    async getWhsById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid whs ID.");
        }
        const whs = await Whs.findOne({ where: { id } });
        if (whs == null) {
            throw new Error("Whs not found.");
        }
        return whs;
    }

    async updateWhsById(id, data) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid whs ID.");
        }
        const whs = await Whs.findOne({ where: { id } });
        if (whs == null) {
            throw new Error("Whs not found.");
        }
        let updatedWhs = await whs.update(data);
        return updatedWhs;
    }

    async deleteWhsById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid whs ID.");
        }
        const whs = await Whs.findOne({ where: { id } });
        if (whs == null) {
            throw new Error("Whs not found.");
        }
        let deletedWhs = await Whs.destroy({ where: { id } });
        if (deletedWhs == 1) {
            deletedWhs = {
                status: 200,
                message: `Successfully deleted whs with ID: '${id}'`
            };
        }
        return deletedWhs;
    }
}

module.exports = new WhsService();
