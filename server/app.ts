export {};
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
let middleware = require('./middleware');
let userController = require('./controller/UserController');
let filmController = require('./controller/FilmController');
let houseController = require('./controller/HouseController');
let broadcastController = require('./controller/BroadcastController');
let bookingController = require('./controller/bookingController');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/simplybook', {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

// TODO check if cors actually needed
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.status(200).json({response: "server running"});
});
app.use('/users', userController);

app.use(middleware.checkToken);

app.use('/films', filmController);
app.use('/houses', houseController);
app.use('/broadcasts', broadcastController);
app.use('/booking', bookingController);

app.get('*', function(req, res){
    res.status(404).json({
        message: "Invalid request path!"
    });
});

module.exports = app;
