
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema = new Schema({
  token: String,
  username: String,
  created: Number
});

module.exports = mongoose.model('UserSessions', UserSessionSchema);