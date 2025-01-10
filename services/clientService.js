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
}

module.exports = new ClientService();
