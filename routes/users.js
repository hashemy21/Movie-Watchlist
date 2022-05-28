const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
//CSRF Token
var csrf = require('csurf');
const bodyParser = require('body-parser');
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

const { check, validationResult } = require('express-validator');

const { forwardAuthenticated } = require('../config/auth');

// Login GET
router.get(
	'/login',
	forwardAuthenticated,
	/* csrfProtection,*/ (req, res) =>
		res.render('login' /*, { csrfToken: req.csrfToken() }*/)
);

// Login POST
router.post(
	'/login',
	/*parseForm, csrfProtection,*/ (req, res, next) => {
		passport.authenticate('local', {
			successRedirect: '/watchlist',
			failureRedirect: '/users/login',
			failureFlash: true,
		})(req, res, next);
	}
);

// Register GET
router.get('/register', forwardAuthenticated, (req, res) =>
	res.render('register')
);

// Register POST
router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = [];

	if (!name || !email || !password || !password2) {
		errors.push({ msg: 'Please enter all fields' });
	}

	if (password != password2) {
		errors.push({ msg: 'Passwords do not match' });
	}

	if (password.length < 8) {
		errors.push({ msg: 'Password must be at least 8 characters' });
	}

	if (
		!email.match(
			/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
		)
	) {
		errors.push({ msg: 'invalid email' });
	}

	if (!name.match(/^[A-Za-z\s]+$/)) {
		errors.push({ msg: 'invalid name' });
	}

	if (
		!password.match(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/
		)
	) {
		errors.push({ msg: 'invalid password' });
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2,
		});
	} else {
		User.findOne({ email: email }).then((user) => {
			if (user) {
				errors.push({ msg: 'Email already exists' });
				res.render('register', {
					errors,
					name,
					email,
					password,
					password2,
				});
			} else {
				const newUser = new User({
					name,
					email,
					password,
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then((user) => {
								req.flash(
									'success_msg',
									'You are now registered and can log in'
								);
								res.redirect('/users/login');
							})
							.catch((err) => console.log(err));
					});
				});
			}
		});
	}
});

// Logout POST
router.get('/logout', (req, res) => {
	req.session.destroy(function () {
		res.redirect('/users/login');
	});
});

//Forget password GET
router.get('/forgetpassword', function (req, res) {
	res.render('forgetpassword.ejs');
});

//Forget password POST
router.post('/forgetpassword', function (req, res) {
	User.findOne({ email: req.body.email }, function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ Success: 'This email is not registered' });
		} else {
			data.password = req.body.password;
			data.email = req.body.email;
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(data.password, salt, (err, hash) => {
					if (err) throw err;
					data.password = hash;
					data
						.save()
						.then((user) => {
							res.redirect('/users/login');
						})
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

module.exports = router;
