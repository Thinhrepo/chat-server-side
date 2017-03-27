var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var userGroupSchema = new mongoose.Schema({
    userId: ObjectId,
    groupId: ObjectId,
    status: Number
}, {timestamps: true});

var UserGroup = mongoose.model('UserGroup', userGroupSchema);

module.exports = UserGroup;
