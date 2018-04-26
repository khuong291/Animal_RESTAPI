const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String
})

module.exports = mongoose.model('Animal', animalSchema);