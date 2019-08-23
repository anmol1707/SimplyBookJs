export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
    userId: String,
    broadcastId: String,
    rowNumber: Number,
    columnNumber: Number,
    date: Date
});

let Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
