const mongoose = require("mongoose");

const Owner = mongoose.model(
  "Owner",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
     email: {
        type: String,
        unique: true // Rendre le champ email unique
    },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  })
);

module.exports = Owner;
