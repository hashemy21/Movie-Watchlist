

const registrationSchema = {
	email: {
		notEmpty: true,

		isEmail: {
			errorMessage: 'Invalid Email',
		},
	},

	password: {
		notEmpty: true,

		isLength: {
			options: [{ min: 8 }],

			errorMessage: 'Must be at least 12 characters',
		},

		matches: {
			options: ['(?=.*[a-zA-Z])(?=.*[0-9]+).*', 'g'],

			errorMessage: 'Password must be alphanumeric.',
		},

		errorMessage: 'Invalid password',
	},
};

module.exports = {
	registrationSchema: registrationSchema,
};
