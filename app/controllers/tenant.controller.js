const Tenant = require("../models/tenant.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.setPassword = async (req, res) => {
     console.log("Request body:", req.body); // Log the entire request body
     console.log("Token from params:", req.params.token);

     try {
        const tenant = await Tenant.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!tenant) {
            console.error("No tenant found with the provided token or token has expired.");
            return res.status(400).send({ message: "Password reset token is invalid or has expired." });
        }

        if (!req.body.password) {
            console.error("No password provided in request body.");
            return res.status(400).send({ message: "Password is required." });
        }

        tenant.password = bcrypt.hashSync(req.body.password, 5);
        tenant.resetPasswordToken = undefined;
        tenant.resetPasswordExpires = undefined;
        await tenant.save();
        const updatedTenant = await Tenant.findById(tenant._id);
    console.log("Updated password hash:", updatedTenant.password);

        res.status(200).send({ message: 'Password set successfully!' });
    } catch (error) {
        console.error("Error setting password:", error);
        res.status(500).send({ message: 'Failed to set password', details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const tenant = await Tenant.findOne({ email: req.body.email });
        if (!tenant) {
            return res.status(404).send({ message: "Tenant Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, tenant.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: tenant._id }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ id: tenant._id, email: tenant.email, accessToken: token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: error.message });
    }
};
