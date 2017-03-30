
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserStampSchema = new Schema({
	username: String,
	stampId: String
});

module.exports = mongoose.model('UserStamps', UserStampSchema);