
// controllers
var FindNewestUsers = require(ROOT_CONTROLLER + '/user/getNewestUsers');
var FindUserByName = require(ROOT_CONTROLLER + '/user/getUserByUsernameSafe');

// methods
exports.getNewestUsers = FindNewestUsers.getNewestUsers;
exports.getUserByUsernameSafe = FindUserByName.get;