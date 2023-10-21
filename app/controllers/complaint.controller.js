const Complaint = require('../models/complaint.model');
exports.createComplaint = async (req, res) => {
    try {
        const userRole = req.userRole;

        let complainantId;

        if (userRole === 'OWNER' || userRole === 'TENANT') {
            complainantId = req.userId;
        } else {
            return res.status(403).send({ message: 'Unauthorized.' });
        }

        const complaint = new Complaint({
            description: req.body.description,
            complainant_id: complainantId,
            complainantType: userRole,
        });

        await complaint.save();

        res.status(201).send({ message: 'Complaint created successfully!', complaint });
    } catch (error) {
        console.error("Error creating complaint:", error.message);
        res.status(500).send({ message: 'Failed to create complaint', details: error.message });
    }
};


exports.getAllComplaints = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const complaints = await Complaint.find();
        res.status(200).send(complaints);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch complaints', details: error.message });
    }
};

exports.getMyComplaints = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'OWNER' && userRole != 'TENANT')
            return res.status(403).send({ message: 'Unauthorized.' });
        const complaints = await Complaint.find({complainant_id: req.userId});
        res.status(200).send(complaints);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch complaints', details: error.message });
    }
};

exports.getComplaintById = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).send({ message: 'Complaint not found' });
        }
        res.status(200).send(complaint);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch complaint', details: error.message });
    }
};

exports.updateComplaint = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!complaint) {
            return res.status(404).send({ message: 'Complaint not found' });
        }
        res.status(200).send({ message: 'Complaint updated successfully!', complaint });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update complaint', details: error.message });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).send({ message: 'Complaint not found' });
        }
        res.status(200).send({ message: 'Complaint deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete complaint', details: error.message });
    }
};
