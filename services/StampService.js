var Stamp = require('../models/Stamp');
var UserStamp = require('../models/UserStamp');

exports.findStamps = function (name) {
	
	if(Utils.isNull(name)){
		name = "";
	}
	
	return Stamp.find( { "name" : { $regex : name } } );
};

exports.findStampsWithLimit = function (name, count) {

	return findStamps( name ).sort({
		created: -1
	}).limit(count, function (err, response) {
		res.end(JSON.stringify(response));
	});
};

//

exports.findUserStamps = function (username) {
	
	if(Utils.isNull(username)){
		return null;
	}
	
	return UserStamp.find( { "username" : username } );
};
