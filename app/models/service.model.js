const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AgencyMember"
    },
    providers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider"
    }]
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
