const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactInfo: {
        phone: String,
        email: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AgencyMember"
    }
});

const Provider = mongoose.model("Provider", ProviderSchema);

module.exports = Provider;
