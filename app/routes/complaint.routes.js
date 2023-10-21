const express = require('express');
const router = express.Router();
const roleAuthorization = require("../middlewares/roleAuthorization");
const complaintController = require('../controllers/complaint.controller');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

router.post("/api/complaint", jwtAuthMiddleware, roleAuthorization, complaintController.createComplaint);
router.get('/api/complaints/me', jwtAuthMiddleware, roleAuthorization, complaintController.getMyComplaints);
router.get('/api/complaints', jwtAuthMiddleware, roleAuthorization, complaintController.getAllComplaints);
router.get('/api/complaints/:id', jwtAuthMiddleware, roleAuthorization, complaintController.getComplaintById);
router.put('/api/complaints/:id', jwtAuthMiddleware, roleAuthorization, complaintController.updateComplaint);
router.delete('/api/complaints/:id', jwtAuthMiddleware, roleAuthorization, complaintController.deleteComplaint);

module.exports = router;
