const Service = require("../models/service.model");

exports.createService = async (req, res) => {
    try {
        const service = new Service({
            ...req.body,
            createdBy: req.userId
        });
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        res.status(500).send({ message: "Error creating service", details: error.message });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send({ message: "Error fetching services", details: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!service) {
            return res.status(404).send({ message: "Service not found" });
        }
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send({ message: "Error updating service", details: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndRemove(req.params.id);
        if (!service) {
            return res.status(404).send({ message: "Service not found" });
        }
        res.status(200).send({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting service", details: error.message });
    }
};