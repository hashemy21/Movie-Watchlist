/*
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
//import registration schema
const { registrationSchema } = require('../models/Validation');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) =>
	res.render('register')
);

router.post('/register', async function (req, res) {
	try {
		//const User = await getUserModel();

		req.checkBody(registrationSchema);

		const errors = req.validationErrors();

		if (errors) {
			return res.status(500).json(errors);
		}

		const { name, email, password, password2 } = req.body;

		const existingUser = await User.findOne({ email: email }).exec();

		if (existingUser) {
			return res
				.status(409)
				.send(`The specified email ${email} address already exists.`);
		}

		const submittedUser = {
			firstName: firstName,

			lastName: lastName,

			username: email,

			email: email,

			password: password,

			created: Date.now(),
		};

		const user = new User(submittedUser);

		await user.save();

		res.status(201).json({
			user: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
		});
	} catch (err) {
		res
			.status(500)
			.send('There was an error creating user.  Please try again later');
	}
});
*/
