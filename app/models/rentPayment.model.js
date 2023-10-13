const mongoose = require("mongoose");

const RentPayment = mongoose.model(
  "RentPayment",
  new mongoose.Schema({
    amount: Number,
    pay_at: Date,
    payment_method: String,
    tenant_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant"
    },
    room_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
  })
);

module.exports = RentPayment;
