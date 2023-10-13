const mongoose = require("mongoose");

const Property = mongoose.model(
  "Property",
  new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    adress: {
      type: String,
      required: true
    },
    owner_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    }
  })
);

module.exports = Property;
