const db = require("../models");
const Tenant = db.tenant;
const Owner = db.owner;
const Property = db.property;
const Room = db.room;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.createTenantAccount = (req, res) => {
    const newUser = new Tenant({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    newUser.save()
    .then(() => {
        res.status(201).json({
            message: 'New tenant was registered successfully!',
            status: 'success'
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to create tenant', status: 'failed' });
    });

};

exports.createOwnerAccount = (req, res) => {
    const newUser = new Owner({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    newUser.save()
    .then(() => {
        res.status(201).json({
            message: 'New owner was registered successfully!',
            status: 'success'
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to create owner', status: 'failed' });
    });

};

exports.createProperty = (req, res) => {
    const newProperty = new Property({
        name: req.body.name,
        adress: req.body.adress,
        owner_id: req.body.owner_id,
    });

    newProperty.save()
    .then(() => {
        res.status(201).json({
            message: 'New property was registered successfully!',
            status: 'success'
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to create a new property', status: 'failed' });
    });

};

exports.updateProperty = (req, res) => {

    const propertyId = req.params.id;
     const updatedData = req.body;

    Property.findByIdAndUpdate(propertyId, updatedData, { new: true })
    .then(updatedProperty => {
        res.json(updatedProperty);
    }).catch(error => {
        res.status(500).json({ error: 'Failed to update property' });
    });

};

exports.createRoom = (req, res) => {
    const newRoom = new Room({
        rent_status: req.body.rent_status,
        payment_status: req.body.payment_status,
        property_id: req.body.property_id,
    });

    newRoom.save()
    .then(() => {
        res.status(201).json({
            message: 'New room was registered successfully!',
            status: 'success'
        });
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to create a new room', status: 'failed' });
    });

};

exports.updateRoom = (req, res) => {

    const roomId = req.params.id;
    const updatedData = req.body;

    Room.findByIdAndUpdate(roomId, updatedData, { new: true })
    .then(updatedRoom => {
        res.json(updatedRoom);
    }).catch(error => {
        res.status(500).json({ error: 'Failed to update property' });
    });

};

exports.getAllProperties = (req, res) => {
    Property.find()
    .then(properties => {
      res.json(properties);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve properties' });
    });
};

exports.getAllRooms = (req, res) => {
    Room.find()
    .then(rooms => {
      res.json(rooms);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve properties' });
    });
};

exports.getAllOwners = (req, res) => {
    Owner.find()
    .then(owners => {
        owners.forEach(owner => { delete owner[password] });
        return res.json(owners);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve owners' });
    });
};

exports.getAllTenants = (req, res) => {
    Tenant.find()
    .then(tenants => {
        tenants.forEach(tenant => { delete tenant[password] });
        return res.json(tenants);
    }).catch(error => {
      res.status(500).json({ error: 'Failed to retrieve owners' });
    });
};
