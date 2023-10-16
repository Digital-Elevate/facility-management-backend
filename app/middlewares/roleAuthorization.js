const Owner = require("../models/owner.model");
const AgencyMember = require("../models/agencyMember.model");

module.exports = async (req, res, next) => {
    try {
        const owner = await Owner.findById(req.userId);
        if (owner) {
            req.userRole = 'OWNER';
            return next();
        }

        const agencyMember = await AgencyMember.findById(req.userId);
        if (agencyMember) {
            req.userRole = 'AGENCY_MEMBER';
            return next();
        }

        return res.status(403).send({ message: "Access denied. You must be an owner or agency member to create a property." });
    } catch (error) {
        console.error("Error in roleAuthorization middleware:", error.message);
        res.status(500).send({ message: "Failed to verify role", details: error.message });
    }
};
