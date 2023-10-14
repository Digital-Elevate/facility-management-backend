const mongoose = require('mongoose');

const OfficeSpaceSchema = new mongoose.Schema({
  name: String,
  size: Number, // en metre carré
  isRented: { type: Boolean, default: false },
  rentPrice: Number,
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'CommercialProperty', required: true },

});

module.exports = mongoose.model('OfficeSpace', OfficeSpaceSchema);
