const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authenticateToken = require('../lib/middlewares/middlewares');
const upload = require('../lib/middlewares/uploadFilemiddleware');

router.post('/create-client', authenticateToken, clientController.createClient);
// router.get('/get-all-clients', authenticateToken, clientController.getAllClients);
router.get('/get-client/:id', authenticateToken, clientController.getClientById);
// router.put('/update-client/:id', authenticateToken, upload.single('client_image_url'), clientController.updateClientById);
// router.delete('/delete-client/:id', authenticateToken, clientController.deleteClientById);

module.exports = router;
