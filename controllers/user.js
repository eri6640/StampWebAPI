
// controllers
var FindNewestUsers = require(ROOT_CONTROLLER + '/user/getNewestUsers');
var FindUserByName = require(ROOT_CONTROLLER + '/user/getUserByUsernameSafe');
var AddStampToCollection = require(ROOT_CONTROLLER + '/user/addStampToCollection');

// methods
exports.getNewestUsers = FindNewestUsers.getNewestUsers;
exports.getUserByUsernameSafe = FindUserByName.get;
exports.addStampToCollection = AddStampToCollection.add;
