const clientService = require('../services/clientService');

class ClientController {
    async createClient(req, res) {
        try {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            if (req.files) {
                if (req.files.izaa_tijariye_pdf_url) {
                    req.body.izaa_tijariye_pdf_url = `${baseUrl}/uploads/${req.files.izaa_tijariye_pdf_url[0].filename}`;
                }
                if (req.files.photocopy_id_card_url) {
                    req.body.photocopy_id_card_url = `${baseUrl}/uploads/${req.files.photocopy_id_card_url[0].filename}`;
                }
            }
            const client = await clientService.createClient(req.body, req.params.user_id);
            console.log(`Log::Successfully created client with id: '${client.id}' for salesman with id: '${req.params.user_id}'`)
            res.status(200).json(client);
        } catch (error) {
            console.log(`Log::Failed to create client with error: '${error.message}' for salesman with id: '${req.params.user_id}'`)
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

    async getClientsBySalesman(req, res) {
        try {
            const clients = await clientService.getClientsBySalesman(req.params.user_id);
            console.log(`Log::Successfully retrieved clients for salesman with id: '${req.params.user_id}'`)
            res.status(200).json(clients);
        } catch (error) {
            console.log(`Log::Failed to retrieve clients for salesman with id '${req.params.user_id}' with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }

    async getLocationAreas(req, res) {
        try {
            const locationAreas = await clientService.getLocationAreas();
            console.log(`Log::Successfully retrieved location areas`)
            res.status(200).json(locationAreas);
        } catch (error) {
            console.log(`Log::Failed to retrieve location areas with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ClientController();
