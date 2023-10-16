const express = require('express');
const serviceRequestController = require('../controllers/serviceRequest.controller');
const tenantAuth = require('../middlewares/tenantAuth');
const router = express.Router();
const agencyMemberMiddleware = require('../middlewares/agencyMember');

router.post('/service-requests',tenantAuth, serviceRequestController.createServiceRequest);
router.get('/service-requests', serviceRequestController.getAllServiceRequests);
router.put('/service-requests/:id',tenantAuth, serviceRequestController.updateServiceRequest);
router.delete('/service-requests/:id', serviceRequestController.deleteServiceRequest);
router.put('/service-requests/:id/status', agencyMemberMiddleware, serviceRequestController.updateServiceRequestStatus);
router.get('/tenants/:tenantId/service-requests', tenantAuth, serviceRequestController.getServiceRequestsByTenant);

module.exports = router;
