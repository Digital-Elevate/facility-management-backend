const mongoose = require("mongoose");

const Owner = mongoose.model(
  "Owner",
  new mongoose.Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Rendre le champ email unique
    },
    password: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  })
);

module.exports = Owner;
