
// controllers
var Add = require(ROOT_CONTROLLER + '/news/add');
var GetAll = require(ROOT_CONTROLLER + '/news/getAll');


// methods
exports.add = Add.add;
exports.getAll = GetAll.getAll;
