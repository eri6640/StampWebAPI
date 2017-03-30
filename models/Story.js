
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
	title: String,
	content: String,
	username: String,
	created: Number
});

module.exports = mongoose.model('News', StorySchema);