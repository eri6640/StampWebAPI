
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema = new Schema({
		token: String,
		username: String,
		pass: String,
		used: Number
	});

module.exports = mongoose.model('UserSessions', UserSessionSchema);
