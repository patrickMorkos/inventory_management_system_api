const SalesmanClientVisits = require('../models/SalesmanClientVisits');
const User = require('../models/User');
const Client = require('../models/Client');

class SalesmanClientVisitsService {
    async clientCheckIn(user_id, client_id) {
        const salesman = await User.findOne({ where: { id: user_id } });
        if (!salesman) {
            throw new Error('Salesman not found');
        }

        const client = await Client.findOne({ where: { id: client_id } });
        if (!client) {
            throw new Error('Client not found');
        }

        const salesmanClientVisits = await SalesmanClientVisits.create({
            check_in_date_time: new Date(),
            user_id: user_id,
            client_id: client_id,
        });

        if (salesmanClientVisits) {
            return salesmanClientVisits;
        } else {
            throw new Error('Failed to check in salesman to client');

        }
    }

    async clientCheckOut(user_id, client_id) {
        const salesman = await User.findOne({ where: { id: user_id } });
        if (!salesman) {
            throw new Error('Salesman not found');
        }

        const client = await Client.findOne({ where: { id: client_id } });
        if (!client) {
            throw new Error('Client not found');
        }

        const salesmanClientVisits = await SalesmanClientVisits.findOne({
            where: { user_id: user_id, client_id: client_id, check_out_date_time: null }
        });
        if (!salesmanClientVisits) {
            throw new Error('Salesman not checked in to client');
        }


        salesmanClientVisits.check_out_date_time = new Date();
        await salesmanClientVisits.save();
        return salesmanClientVisits;
    }
}

module.exports = new SalesmanClientVisitsService();