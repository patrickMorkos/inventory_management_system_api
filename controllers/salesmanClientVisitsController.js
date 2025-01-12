const salesmanClientVisitsService = require('../services/salesmanClientVisitsService');

class SalesmanClientVisitsController {
    async clientCheckIn(req, res) {
        try {
            const salesmanClientVisits = await salesmanClientVisitsService.clientCheckIn(req.params.user_id, req.query.client_id);
            console.log(`Log::Salesman with id '${req.params.user_id}' successfully checked in to client with id '${req.query.client_id}'`);
            res.status(200).json(salesmanClientVisits);
        } catch (error) {
            console.log(`Log::Failed to check in salesman with id '${req.params.user_id}' to client with id '${req.query.client_id}'`);
            res.status(400).json({ error: error.message });
        }
    }

    async clientCheckOut(req, res) {
        try {
            const salesmanClientVisits = await salesmanClientVisitsService.clientCheckOut(req.params.user_id, req.query.client_id);
            console.log(`Log::Salesman with id '${req.params.user_id}' successfully checked out of client with id '${req.query.client_id}'`);
            res.status(200).json(salesmanClientVisits);
        } catch (error) {
            console.log(`Log::Failed to check out salesman with id '${req.params.user_id}' from client with id '${req.query.client_id}'`);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new SalesmanClientVisitsController();