const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Movie = require('../models/Movie');
const User = require('../models/User');
const Comment = require('../models/Comment');
var serialize = require('serialize-javascript');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/watchlist', (req, res) => {
	try {
		Movie.find((err, data) => {
			if (err) {
				console.log('Your watchlist is empty');
			} else {
				res.render('watchlist', { data: data, user: req.user });
			}
		});
	} catch (error) {
		console.log('There are no movies');
	}
});

router.get('/comment', (req, res) => res.render('comment'));

router.post('/comment', (req, res) => {
	try {
		var comment = new Comment({
			name: User.name,
			comment: serialize(req.body.comment),
		});
		comment.save((err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/comment');
			}
		});
	} catch (error) {
		console.log(error);
	}
});
/*
router.post('/watchlist', (req, res) => {
	try {
		var movie = new Movie({
			Movie: req.body.movie,
			Director: req.body.director,
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
*/

module.exports = router;
