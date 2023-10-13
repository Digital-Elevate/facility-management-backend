const mongoose = require("mongoose");

const ServiceRequest = mongoose.model(
  "ServiceRequest",
  new mongoose.Schema({
    description: String,
    status:{
        type: String,
        enum: ['PENDING', 'ATTRIBUTED', 'COMPLETED'],
        default: 'PENDING'
    },
    tenant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant"
    }
  })
);

module.exports = ServiceRequest;
