var request1 = require("request");
const http = require('http');

var list = "";
const port = 8000;

request1.get("https://krunapon.github.io/google/call-kk-restaurants.json", (error, response, body) => {
        if (error) {
            return JSON.parse(body);
        }
        var result = JSON.parse(body);
        var data = result.results;

        for (element of data) {
            list += '<li>' + element.name + '</li>';
        }
    });


const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
    res.write('<h1>Restaurants in Khon Kaen</h1>')
    res.write('<ol>' + list + '</ol>')

});

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
});