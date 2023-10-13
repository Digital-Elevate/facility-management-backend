const mongoose = require("mongoose");

const Owner = mongoose.model(
  "Owner",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
  })
);

module.exports = Owner;
