const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array());
app.use(express.static('public'));
 
app.set('view engine', 'ejs');

const MongoClient = require("mongodb").MongoClient;
const uri =
    "mongodb+srv://lab11:123456z@cluster0.tspnm.mongodb.net/lab11?retryWrites=true&w=majority";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    const db = client.db("lab11");
    const collection = db.collection("data");
    console.log('Connected to Database');
    app.get('/', (req, res) => {
        db.collection('task').find().toArray()
        .then(
            results => {
                res.render('index.ejs', { tasks: results})
            })
        .catch()
    })
    
    app.post('/schedule', function (req, res) {
        console.log(req.body)
        var date = req.body.date;
        var task = req.body.task;
        collection.insertOne(req.body).then(
            result => {
                console.log(result);
                res.redirect('/');
            })
            .catch(error => comnsole.error(error))
    })
})

app.listen(3000);

