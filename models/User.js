
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	name: String,
	surname: String,
	email: String,
	password: String,
	created: Number
});

module.exports = mongoose.model('Users', UserSchema);