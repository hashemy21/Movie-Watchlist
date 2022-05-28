const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	movie: {
		type: String,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
