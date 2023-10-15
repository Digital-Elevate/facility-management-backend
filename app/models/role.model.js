const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Role', RoleSchema);
