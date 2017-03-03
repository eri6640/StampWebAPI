
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSessionSchema = new Schema({
  token: String,
  userId: String,
  created: Number
});

module.exports = mongoose.model('UserSessions', UserSessionSchema);