const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.agencyMember = require("./agencyMember.model");
db.commercialProperty = require("./commercialProperty.model");
db.complaint = require("./complaint.model");
db.owner = require("./owner.model");
db.property = require("./property.model");
db.rentPayment = require("./rentPayment.model");
db.room = require("./room.model");
db.serviceRequest = require("./serviceRequest.model");
db.tenant = require("./tenant.model");

db.AGENCY_MEMBER_ROLE = ["ADMIN", "MANAGER"];

module.exports = db;