const mongoose = require("mongoose");

const Tenant = mongoose.model(
  "Tenant",
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
      required: true
    },
    password: {
      type: String,
      required: true
    }
  })
);

module.exports = Tenant;
