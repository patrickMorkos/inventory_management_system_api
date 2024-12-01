const whsService = require('../services/whsService');

class WhsController {
    async createWhs(req, res) {
        try {
            const whs = await whsService.createWhs(req.body);
            console.log(`Log::Successfully created whs with id: '${whs.id}'`);
            res.status(200).json(whs);
        } catch (error) {
            console.log(`Log::Failed to create whs with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllWhs(req, res) {
        try {
            const whss = await whsService.getAllWhs();
            console.log(`Log::Successfully retrieved all whss`);
            res.status(200).json(whss);
        } catch (error) {
            console.log(`Log::Failed to retrieve all whss with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async getWhsById(req, res) {
        try {
            const whs = await whsService.getWhsById(req.params.id);
            console.log(`Log::Successfully retrieved whs with id: '${req.params.id}'`);
            res.status(200).json(whs);
        } catch (error) {
            console.log(`Log::Failed to retrieve whs with id '${req.params.id}' with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateWhsById(req, res) {
        try {
            const updatedWhs = await whsService.updateWhsById(req.params.id, req.body);
            console.log(`Log::Successfully updated whs with ID: '${req.params.id}'`);
            res.status(200).json(updatedWhs);
        } catch (error) {
            console.error(`Log::Failed to update whs with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async deleteWhsById(req, res) {
        try {
            const deletedWhs = await whsService.deleteWhsById(req.params.id);
            console.log(`Log::Successfully deleted whs with ID: '${req.params.id}'`);
            res.status(200).json(deletedWhs);
        } catch (error) {
            console.error(`Log::Failed to delete whs with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new WhsController();
