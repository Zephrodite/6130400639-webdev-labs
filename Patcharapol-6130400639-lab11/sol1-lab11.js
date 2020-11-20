var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './');
app.use(express.static('public'));

app.get('/info', function(req, res) {
    res.render('static_view', {
        name: "Patcharapol Pansakdanon",
        profile_url: "https://zephrodite.github.io/profile/",
        company1: "https://www.microsoft.com/th-th/",
        company1_name: "Microsoft",
        company2: "https://www.nasa.gov/",
        company2_name: "NASA",
        company3: "https://about.twitter.com/en_us/company.html",
        company3_name: "Twitter"
    });
});

app.listen(3000); 