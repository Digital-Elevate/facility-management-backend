const Property = require('../models/property.model');
const Owner = require('../models/owner.model');

exports.createProperty = async (req, res) => {
    try {
        const userRole = req.userRole;

        let ownerId;

        if (userRole === 'AGENCY_MEMBER') {
            ownerId = req.body.owner_id;
            if (!ownerId) {
                return res.status(400).send({ message: 'Owner ID is required for agency members.' });
            }
            const owner = await Owner.findById(ownerId);
            if (!owner) {
                return res.status(404).send({ message: 'Owner ID not found' });
            }
        } else if (userRole === 'OWNER') {
            ownerId = req.userId;
        } else {
            return res.status(403).send({ message: 'Unauthorized.' });
        }

        const property = new Property({
            name: req.body.name,
            address: req.body.address,
            type: req.body.type,
            owner_id: ownerId
        });

        await property.save();

        res.status(201).send({ message: 'Property created successfully!', property });
    } catch (error) {
        console.error("Error creating property:", error.message);
        res.status(500).send({ message: 'Failed to create property', details: error.message });
    }
};


exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).send(properties);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch properties', details: error.message });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).send({ message: 'Property not found' });
        }
        res.status(200).send(property);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch property', details: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!property) {
            return res.status(404).send({ message: 'Property not found' });
        }
        res.status(200).send({ message: 'Property updated successfully!', property });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update property', details: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) {
            return res.status(404).send({ message: 'Property not found' });
        }
        res.status(200).send({ message: 'Property deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete property', details: error.message });
    }
};
