export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let broadcastSchema = new Schema({
    filmId: String,
    houseId: String,
    date: Date
});

let Broadcast = mongoose.model('Broadcast', broadcastSchema);
module.exports = Broadcast;
