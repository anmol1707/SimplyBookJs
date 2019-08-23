export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let houseSchema = new Schema({
    rowCount: Number,
    columnCount: Number,
    name: String
});

let House = mongoose.model('House', houseSchema);
module.exports = House;
