const mongoose = require("mongoose");

const Complaint = mongoose.model(
  "Complaint",
  new mongoose.Schema({
    description: String,
    status:{
        type: String,
        enum: ['OPEN', 'IN PROGRESS', 'RESOLVED'],
        default: 'OPEN'
    },
    complainant_id : {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "complainantType",
        required: true
    },
    complainantType : {
      type: String,
      required: true,
      enum: ['Tenant', 'Owner'],
    },
    createdAt : {
      type: Date,
      default: Date.now(),
    }
  })
);

module.exports = Complaint;
