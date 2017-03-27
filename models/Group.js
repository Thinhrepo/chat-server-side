var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var groupSchema = new mongoose.Schema({
    name: String,
    status: Number
}, {timestamps: true});

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
