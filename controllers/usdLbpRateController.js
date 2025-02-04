const usdLbpRateService = require('../services/usdLbpRateService');

class UsdLbpRateController {
    async getRate(req, res) {
        try {
            const rate = await usdLbpRateService.getRate();
            console.log(`Log::Successfully retrieved USD to LBP rate`);
            res.status(200).json(rate);
        } catch (error) {
            console.log(`Log::Failed to retrieve USD to LBP rate with error: '${error.message}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateRate(req, res) {
        try {
            const { rate } = req.body;
            if (!rate) {
                throw new Error('Rate is required');
            }

            const updatedRate = await usdLbpRateService.updateRate(rate);
            console.log(`Log::Successfully updated USD to LBP rate`);
            res.status(200).json(updatedRate);
        } catch (error) {
            console.error(`Log::Failed to update USD to LBP rate: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UsdLbpRateController();
