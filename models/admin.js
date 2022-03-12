var mongoose = require('mongoose');
var Schema = mongoose.Schema;

adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true })

admin = mongoose.model('admin', adminSchema);
module.exports = admin;