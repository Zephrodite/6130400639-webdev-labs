var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
app.get('/', function(req, res) {
    res.render('form');
});
app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static('public'));

app.post('/', function(req, res) {
    console.log(req.body);
    res.send(`${req.body.name.bold()} used these following skills:${req.body.skills.bold()} while doing internship at ${req.body.internship.bold()}`)
});
app.listen(3000);