const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../lib/middlewares/middlewares');
const upload = require('../lib/middlewares/uploadFilemiddleware');

router.post(
    '/create-client/:user_id',
    authenticateToken,
    upload.fields([
        { name: 'izaa_tijariye_pdf_url', maxCount: 1 },
        { name: 'photocopy_id_card_url', maxCount: 1 }
    ]),
    clientController.createClient
);
router.get('/get-client/:id', authenticateToken, clientController.getClientById);
router.get('/get-client-by-salesman/:user_id', authenticateToken, clientController.getClientsBySalesman);
router.get('/get-location-areas', clientController.getLocationAreas);

module.exports = router;
