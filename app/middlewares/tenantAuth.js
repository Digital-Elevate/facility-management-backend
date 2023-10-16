const Tenant = require("../models/tenant.model");

module.exports = async (req, res, next) => {
    try {
        const tenant = await Tenant.findById(req.userId);
        
        if (!tenant) {
            return res.status(403).send({ message: "Access denied. You must be a tenant to make a service request." });
        }

        next();
    } catch (error) {
        res.status(500).send({ message: "Failed to verify role", details: error.message });
    }
};
