const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    messageName: String,
    messageDescription: String,
    userEmail: String
});

const messageModel = mongoose.model('Messages', messageSchema);

module.exports = messageModel;