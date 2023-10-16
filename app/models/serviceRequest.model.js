const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED", "COMPLETED"],
        default: "PENDING"
    },
    additionalNotes: String,
    
    provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
}
});

const ServiceRequest = mongoose.model("ServiceRequest", ServiceRequestSchema);

module.exports = ServiceRequest;
