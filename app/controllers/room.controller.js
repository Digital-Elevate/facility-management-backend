const Room = require('../models/room.model');
exports.createRoom = async (req, res) => {
    try {
        const userRole = req.userRole;


        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });

        const room = new Room({
            roomName: req.body.roomName,
            rent_status: req.body.rent_status,
            payment_status: req.body.payment_status,
            property_id : req.body.property_id
        });

        await room.save();

        res.status(201).send({ message: 'Room created successfully!', room });
    } catch (error) {
        console.error("Error creating room:", error.message);
        res.status(500).send({ message: 'Failed to create room', details: error.message });
    }
};


exports.getAllRoomsByProperty = async (req, res) => {
    try {
        const property_id = req.params.id;
        const rooms = await Room.find({ property_id });
        res.status(200).send(rooms);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch rooms', details: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send({ message: 'Room not found' });
        }
        res.status(200).send(room);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch room', details: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });

        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).send({ message: 'Room not found' });
        }
        res.status(200).send({ message: 'Room updated successfully!', room });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update room', details: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const userRole = req.userRole;
        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });

        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send({ message: 'Room not found' });
        }
        res.status(200).send({ message: 'Room deleted successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete room', details: error.message });
    }
};
