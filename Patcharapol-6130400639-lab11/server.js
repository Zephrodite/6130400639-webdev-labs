var express = require('express') ;
var app = express();
var fs = require("fs");

var user = {
    "user4": {
        "name":"Piti",
        "profession":"priest",
        "hobbies":"meditation",
        "id":4
    }
}

app.post('/addUsers', function(req, res) {
    fs.readFile("./" + "users.json" , "utf8", function(err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    }) 
})

app.get("/listUsers", function(req, res) {
    fs.readFile( "./" + "users.json", "utf8", function(err,data) {
        console.log(data);
        res.end(data);
    })
})

app.get('/:id', function(req, res) {
    fs.readFile("./" + "users.json", "utf8", function(err,data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

app.delete('/deleteUsers', function(req, res) {
    fs.readFile("./" + "users.json" , "utf8", function(err, data) {
        data = JSON.parse(data) ;
        delete data["user" + 2];
        console.log(data);
        res.end(JSON.stringify(data));
    })
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});