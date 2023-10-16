const mongoose = require("mongoose");

const AgencyMember = mongoose.model(
  "AgencyMember",
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
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'MANAGER'],
        default: 'ADMIN'
    },
  })
);

module.exports = AgencyMember;
