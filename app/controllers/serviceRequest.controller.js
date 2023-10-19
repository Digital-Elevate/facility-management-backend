const ServiceRequest = require("../models/serviceRequest.model");

exports.createServiceRequest = async (req, res) => {
    try {
        const serviceRequest = new ServiceRequest({
            ...req.body,
            tenant: req.userId
        });
        await serviceRequest.save();
        res.status(201).send(serviceRequest);
    } catch (error) {
        res.status(500).send({ message: "Error creating service request", details: error.message });
    }
};

exports.getAllServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find();
        res.status(200).send(serviceRequests);
    } catch (error) {
        res.status(500).send({ message: "Error fetching service requests", details: error.message });
    }
};

exports.updateServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!serviceRequest) {
            return res.status(404).send({ message: "Service request not found" });
        }
        res.status(200).send(serviceRequest);
    } catch (error) {
        res.status(500).send({ message: "Error updating service request", details: error.message });
    }
};

exports.deleteServiceRequest = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findByIdAndRemove(req.params.id);
        if (!serviceRequest) {
            return res.status(404).send({ message: "Service request not found" });
        }
        res.status(200).send({ message: "Service request deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting service request", details: error.message });
    }
};

exports.updateServiceRequestStatus = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findById(req.params.id);
        
        if (!serviceRequest) {
            return res.status(404).send({ message: "Service request not found." });
        }

        serviceRequest.status = req.body.status;
        await serviceRequest.save();

        res.status(200).send(serviceRequest);
    } catch (error) {
        res.status(500).send({ message: "Error updating service request status", details: error.message });
    }
};

exports.getServiceRequestsByTenant = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find({ tenantId: req.params.tenantId });
        
        if (!serviceRequests) {
            return res.status(404).send({ message: "No service requests found for this tenant." });
        }

        res.status(200).send(serviceRequests);
    } catch (error) {
        res.status(500).send({ message: "Error fetching service requests", details: error.message });
    }
};
