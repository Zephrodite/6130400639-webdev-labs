var express = require('express');
var request1 = require("request");
var app = express();


request1.get("https://httpbin.org/ip", (error, response, body) => {
        if (error) {
            return JSON.parse(body);
        }
        var result = JSON.parse(body);
        var origin = result.origin;
        app.get('/ip', function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            var jsonip = {"ip":origin};
            res.send(jsonip);
        });
        
        app.post('/ip', function(req, res) {
            res.send("POST route on things\n")
        });

    });

app.listen(3000);