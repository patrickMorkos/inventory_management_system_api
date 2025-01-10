const saleService = require('../services/saleService');

class SaleController {
    async createSale(req, res) {
        try {
            const sale = await saleService.createSale(req.params.user_id, req.body);
            console.log(`Log::Successfully created sale with id: '${sale.id}' for salesman with id: '${req.params.user_id}' and client with id: '${req.body.client_id}'`);
            res.status(200).json(sale);
        } catch (error) {
            console.log(`Log::Failed to create sale with error: '${error.message}'`)
            res.status(400).json({ error: error.message });
        }
    }

    async deleteSaleById(req, res) {
        try {
            const deletedSale = await saleService.deleteSaleById(req.params.id);
            console.log(`Log::Successfully deleted sale with ID: '${req.params.id}'`);
            res.status(200).json(deletedSale);
        } catch (error) {
            console.error(`Log::Failed to delete sale with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async updateSaleById(req, res) {
        try {
            const updatedSale = await saleService.updateSaleById(req.params.id, req.body);
            console.log(`Log::Successfully updated sale with ID: '${req.params.id}'`);
            res.status(200).json(updatedSale);
        } catch (error) {
            console.error(`Log::Failed to update sale with ID '${req.params.id}': ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAllClientSales(req, res) {
        try {
            const client_id = req.query.client_id;
            const sales = await saleService.getAllClientSales(req.params.user_id, client_id);
            console.log(`Log::Successfully retrieved all sales for salesman with id: '${req.params.user_id}' of client with id: '${req.query.client_id}'`)
            res.status(200).json(sales);
        } catch (error) {
            console.log(`Log::Failed to retrieve all sales for salesman with id: '${req.params.user_id}' of client with id: '${req.query.client_id}'`)
            res.status(400).json({ error: error.message });
        }
    }

    // async getSaleById(req, res) {
    //     try {
    //         const sale = await saleService.getSaleById(req.params.id);
    //         console.log(`Log::Successfully retrieved sale with id: '${req.params.id}'`)
    //         res.status(200).json(sale);
    //     } catch (error) {
    //         console.log(`Log::Failed to retrieve sale with id '${req.params.id}' with error: '${error.message}'`)
    //         res.status(400).json({ error: error.message });
    //     }
    // }


}

module.exports = new SaleController();
