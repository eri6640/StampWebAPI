
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  username: String,
  password: String,
  created: Number
});

module.exports = mongoose.model('Users', UserSchema);