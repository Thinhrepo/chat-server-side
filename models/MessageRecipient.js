var mongoose = require('mongoose');

var ObjectId = Schema.ObjectId;

var messageRecipientSchema = new mongoose.Schema({
    messageId: ObjectId,
    recipientId: ObjectId,
    recipientGroupId: ObjectId,
    is_read: Boolean
}, {timestamps: true});

var MessageRecipient = mongoose.model('MessageRecipient', messageRecipientSchema);

module.exports = MessageRecipient;
