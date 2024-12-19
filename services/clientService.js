const Client = require('../models/Client');
const QRCode = require('qrcode');

class ClientService {
    async createClient(data) {
        const firstName = data.first_name;
        const lastName = data.last_name;
        const phoneNumber = data.phone_number;

        const client = await Client.findOne({
            where: { first_name: firstName, last_name: lastName, phone_number: phoneNumber }
        });

        if (client != null) {
            throw new Error("Client with that first name, last name, and phone number already exists.");
        }

        let newClient = await Client.create({ ...data });

        const qrData = `${newClient.id}`;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        newClient.qr_code = qrCodeUrl;
        await newClient.save();

        return newClient;
    }


    // async getAllClients() {
    //     const clients = await Client.findAll();
    //     return clients;
    // }

    async getClientById(id) {
        if (!id || isNaN(id)) {
            throw new Error("Invalid client ID.");
        }
        const client = await Client.findOne({ where: { id } });
        if (client == null) {
            throw new Error("Client not found.");
        }
        return client;
    }

    // async updateClientById(id, data) {
    //     if (!id || isNaN(id)) {
    //         throw new Error("Invalid client ID.");
    //     }
    //     const client = await Client.findOne({ where: { id } });
    //     if (client == null) {
    //         throw new Error("Client not found.");
    //     }
    //     if (data.client_name) {
    //         const clientName = data.client_name;
    //         const client2 = await Client.findOne({ where: { client_name: clientName } });
    //         if (client2 != null) {
    //             throw new Error("Client with that name already exists.");
    //         }
    //     }
    //     let updatedClient = await client.update(data);
    //     return updatedClient;
    // }

    // async deleteClientById(id) {
    //     if (!id || isNaN(id)) {
    //         throw new Error("Invalid client ID.");
    //     }
    //     const client = await Client.findOne({ where: { id } });
    //     if (client == null) {
    //         throw new Error("Client not found.");
    //     }
    //     let client2 = await Client.destroy({ where: { id: id } });
    //     if (client2 == 1) {
    //         client2 = {
    //             "status": 200,
    //             "mssg": `Successfully deleted client with ID: '${id}'`
    //         }
    //     }
    //     return client2;
    // }
}

module.exports = new ClientService();
