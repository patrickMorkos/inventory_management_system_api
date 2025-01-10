const clientService = require('../services/clientService');

class ClientController {
    async createClient(req, res) {
        try {
            const client = await clientService.createClient(req.body);
            console.log(`Log::Successfully created client with id: '${client.id}'`)
            res.status(200).json(client);
        } catch (error) {
            console.log(`Log::Failed to create client with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }

    async getClientById(req, res) {
        try {
            const client = await clientService.getClientById(req.params.id);
            console.log(`Log::Successfully retrieved client with id: '${req.params.id}'`)
            res.status(200).json(client);
        } catch (error) {
            console.log(`Log::Failed to retrieve client with id '${req.params.id}' with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ClientController();
