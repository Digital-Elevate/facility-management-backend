const express = require('express');
const serviceController = require('../controllers/service.controller');
const agencyMember = require('../middlewares/agencyMember');

const router = express.Router();

router.post('/api/services', agencyMember, serviceController.createService);
router.get('/api/services', agencyMember, serviceController.getAllServices);
router.put('/api/services/:id', agencyMember, serviceController.updateService);
router.delete('/api/services/:id', agencyMember, serviceController.deleteService);
module.exports = router;
