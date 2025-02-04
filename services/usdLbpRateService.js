const UsdLbpRate = require('../models/UsdLbpRate');

class UsdLbpRateService {
    async getRate() {
        const rate = await UsdLbpRate.findOne({ where: { id: 1 } });
        if (!rate) {
            throw new Error('Exchange rate record not found');
        }
        return rate;
    }

    async updateRate(newRate) {
        const [updated] = await UsdLbpRate.update({ rate: newRate }, { where: { id: 1 } });

        if (!updated) {
            throw new Error('Failed to update exchange rate');
        }

        return await UsdLbpRate.findOne({ where: { id: 1 } });
    }
}

module.exports = new UsdLbpRateService();
