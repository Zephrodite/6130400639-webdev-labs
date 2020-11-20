var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-Parser');
var multer = require('multer');

var upload = multer();

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var movies = require('./movies.js');

app.use('/movies', movies)

app.listen(3000);