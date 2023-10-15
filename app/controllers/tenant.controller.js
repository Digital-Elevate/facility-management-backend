const Tenant = require("../models/tenant.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.setPassword = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!tenant) {
      return res.status(400).send({ message: "Password reset token is invalid or has expired." });
    }

    tenant.password = bcrypt.hashSync(req.body.password, 10);
    tenant.resetPasswordToken = undefined;
    tenant.resetPasswordExpires = undefined;
    await tenant.save();

    res.status(200).send({ message: 'Password set successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to set password', details: error.message });
  }
};
