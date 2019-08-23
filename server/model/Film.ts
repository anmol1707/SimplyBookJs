export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let filmSchema = new Schema({
    name: String,
    duration: Number,
    genre: String,
    language: String,
    description: String
});

let Film = mongoose.model('Films', filmSchema);
module.exports = Film;
