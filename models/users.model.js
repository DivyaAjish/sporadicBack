const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    emailAddress: String,
    firstName: String,
    lastName: String,
    password: String,
    isAdmin: String
});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;