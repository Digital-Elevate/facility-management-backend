const Owner = require("../models/owner.model");
const Property = require("../models/property.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.setPassword = async (req, res) => {
     console.log("Request body:", req.body); // Log the entire request body
     console.log("Token from params:", req.params.token);

     try {
        const owner = await Owner.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!owner) {
            console.error("No owner found with the provided token or token has expired.");
            return res.status(400).send({ message: "Password reset token is invalid or has expired." });
        }

        if (!req.body.password) {
            console.error("No password provided in request body.");
            return res.status(400).send({ message: "Password is required." });
        }

        owner.password = bcrypt.hashSync(req.body.password, 5);
        owner.resetPasswordToken = undefined;
        owner.resetPasswordExpires = undefined;
        await owner.save();
        const updatedOwner = await Owner.findById(owner._id);
    console.log("Updated password hash:", updatedOwner.password);

        res.status(200).send({ message: 'Password set successfully!' });
    } catch (error) {
        console.error("Error setting password:", error);
        res.status(500).send({ message: 'Failed to set password', details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const owner = await Owner.findOne({ email: req.body.email });
        if (!owner) {
            return res.status(404).send({ message: "Owner Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, owner.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ id: owner._id, email: owner.email, accessToken: token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: error.message });
    }
};

exports.getOwnerProperties = async (req, res) => {
    try {
        const ownerId = req.userId; // Assuming you've set the userId in a middleware after verifying the token
        const properties = await Property.find({ owner_id: ownerId });
        return res.status(200).send(properties);
    } catch (error) {
        console.error("Error fetching owner properties:", error);
        return res.status(500).send({ message: "Failed to fetch properties", details: error.message });
    }
};
