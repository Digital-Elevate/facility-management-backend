const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    roomName: {
      type: String,
      required: true
    },
    rent_status: {
        type: String,
        enum: ['RENTED', 'UNRENTED'],
        default: 'UNRENTED'
    },
    payment_status: {
        type: String,
        enum: ['PAID', 'OVERDUE'],
        default: 'OVERDUE'
    },
    property_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }
  })
);

module.exports = Room;
