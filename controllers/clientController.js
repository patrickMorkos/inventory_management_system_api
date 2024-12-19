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

    // async getAllClients(req, res) {
    //     try {
    //         const clients = await clientService.getAllClients();
    //         console.log(`Log::Successfully retrieved all clients`)
    //         res.status(200).json(clients);
    //     } catch (error) {
    //         console.log(`Log::Failed to retrieve all clients`)
    //         res.status(400).json({ error: error.message });
    //     }
    // }

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

    // async updateClientById(req, res) {
    //     try {
    //         if (req.file) {
    //             const baseUrl = `${req.protocol}://${req.get('host')}`;
    //             req.body.client_image_url = `${baseUrl}/uploads/${req.file.filename}`;
    //         }
    //         const updatedClient = await clientService.updateClientById(req.params.id, req.body);
    //         console.log(`Log::Successfully updated client with ID: '${req.params.id}'`);
    //         res.status(200).json(updatedClient);
    //     } catch (error) {
    //         console.error(`Log::Failed to update client with ID '${req.params.id}': ${error.message}`);
    //         res.status(400).json({ error: error.message });
    //     }
    // }

    // async deleteClientById(req, res) {
    //     try {
    //         const deletedClient = await clientService.deleteClientById(req.params.id);
    //         console.log(`Log::Successfully deleted client with ID: '${req.params.id}'`);
    //         res.status(200).json(deletedClient);
    //     } catch (error) {
    //         console.error(`Log::Failed to delete client with ID '${req.params.id}': ${error.message}`);
    //         res.status(400).json({ error: error.message });
    //     }
    // }
}

module.exports = new ClientController();
