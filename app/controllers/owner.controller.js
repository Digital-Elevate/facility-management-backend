const Owner = require("../models/owner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.setPassword = async (req, res) => {
  try {
    const owner = await Owner.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!owner) {
      return res.status(400).send({ message: "Password reset token is invalid or has expired." });
    }

    owner.password = bcrypt.hashSync(req.body.password, 10);
    owner.resetPasswordToken = undefined;
    owner.resetPasswordExpires = undefined;
    await owner.save();

    res.status(200).send({ message: 'Password set successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to set password', details: error.message });
  }
};
