const express = require('express');
const router = express.Router();
const User = require('../models/User');
var serialize = require('serialize-javascript');

const Movie = require('../models/Movie');

router.post('/watchlist', (req, res) => {
	try {
		var movie = new Movie({
			movie: serialize(req.body.movie),
			director: serialize(req.body.director),
		});
		movie.save((err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/watchlist');
			}
		});
	} catch (error) {
		console.log(error);
	}
});

router.get('/search', (req, res) => {
	try {
		Movie.find(
			{
				$or: [
					{ movie: { $regex: req.query.dsearch } },
					{ director: { $regex: req.query.dsearch } },
				],
			},
			(err, data) => {
				if (err) {
					console.log(err);
				} else {
					res.render('watchlist', { data: data });
				}
			}
		);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
