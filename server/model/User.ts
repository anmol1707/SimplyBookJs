export {};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    emailId: String,
    password: String
});

let User = mongoose.model('User', userSchema);
module.exports = User;
