const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Joi = require('@hapi/joi');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		//validate: [isEmail, 'invalid email'],
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
	const schema = Joi.object().keys({
		email: Joi.string().min(8).max(50).required().email(),
		password: Joi.string()
			.min(8)
			.required()
			.max(20)
			.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/), //special/number/capital
	});
	return validationSchema.validate(user, schema);
}

//module.exports.validate = validateUser;
//module.exports = User;

module.exports = User;
