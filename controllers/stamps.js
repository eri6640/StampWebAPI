
// controllers
var SearchStamps = require(ROOT_CONTROLLER + '/stamps/search');
var AddStamps = require(ROOT_CONTROLLER + '/stamps/add');
var FindUserStamps = require(ROOT_CONTROLLER + '/stamps/findUserStamps');

// methods
exports.search = SearchStamps.search;
exports.add = AddStamps.add;

exports.userStamps = FindUserStamps.get;
