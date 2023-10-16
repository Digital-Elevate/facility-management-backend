const AgencyMember = require("../models/agencyMember.model");

module.exports = async (req, res, next) => {
    console.log("Checking agency member for user ID:", req.userId); // Ajoutez ceci pour déboguer

    const agencyMember = await AgencyMember.findById(req.userId);
    console.log("Found agency member:", agencyMember);
    if (!agencyMember) {
         console.log("User is not an agency member. Access denied.");
        return res.status(403).send({ message: "Access denied. You must be an agency member." });
    }

    console.log("User is an agency member. Access granted.");

    next();
};
