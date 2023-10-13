const mongoose = require("mongoose");

const CommercialProperty = mongoose.model(
  "CommercialProperty",
  new mongoose.Schema({
    name: String,
    owner_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AgencyMember"
    }
  })
);

module.exports = CommercialProperty;
