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
    tenant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant"
    }
  })
);

module.exports = Complaint;
