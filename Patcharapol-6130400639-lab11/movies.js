var express = require('express');
var router = express.Router();
var movies = [
    { id: 101, name: "Fight Club", year: 1999, rating: 8.1 },
    { id: 102, name: "Inception", year: 2010, rating: 8.7 },
    { id: 103, name: "The Dark Night", year: 2008, rating: 9 },
    { id: 104, name: "12 Angry Men", year: 1957, rating: 8.9 }
];

router.get('/', function (req, res) {
    res.json(movies);
});

router.get('/:id([0-9]{3,})', function (req, res) {
    var currMovie = movies.filter(function (movie) {
        if (movie.id == req.params.id) {
            return true;
        }

    });

    if (currMovie.length == 1) {
        res.json(currMovie[0])
    } else {
        res.status(404);
        res.json({ messsage: "Not Found" });
    }
});

router.post('/', function (req, res) {
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)) {
        res.status(400);
        res.json({ message: "Bad request" });
    } else {
        var newId = movies[movies.length - 1].id + 1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.json({ message: "New movie created.", location: "/movies/" + newId })
    }

});

router.put('/:id', function (req, res) {
    if (!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)) {

        res.status(400)
        res.json({ message: "Bad Request" });
    } else {
        var updateIndex = movies.map(function (movie) {return movie.id}).indexOf(parseInt(req.params.id));
        if (updateIndex === -1) {
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
        } else {
            movies[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({
                message: "Movie id" + req.params.id + " updated.",
                location: "/movies/" + req.params.id
            });

        }

    }

});

router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    var removeIndex = movies.map(function (movie) {
        return movie.id;
    }).indexOf(parseInt(req.params.id));
    console.log(removeIndex);
    if (removeIndex === -1) {
        res.json({ message: "Not Found" });
    } else {
        movies.splice(removeIndex, 1);
        res.send({ message: "Movie id " + req.params.id + " remove." });

    }

});

module.exports = router;


