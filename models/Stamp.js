
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StampSchema = new Schema({
	name: String,
	description: String,
	year: Number,
	picture: String
});

module.exports = mongoose.model('Stamps', StampSchema);