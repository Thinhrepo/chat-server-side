var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var messageSchema = new mongoose.Schema({
    creatorId: ObjectId,
    content: String
}, {timestamps: true});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
