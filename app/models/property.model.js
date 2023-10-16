const mongoose = require("mongoose");

const Property = mongoose.model(
  "Property",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['commercial', 'residential'],
      required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    }
  })
);

module.exports = Property;
