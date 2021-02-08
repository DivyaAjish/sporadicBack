const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
    plantName: String,
    plantType: String,
    plantDescription: String,
    plantUses: String,
    plantLocation: String,
    plantUrl: String
});

const plantModel = mongoose.model('Plants', plantSchema);

module.exports = plantModel;