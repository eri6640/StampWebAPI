
var User = require(ROOT + '/models/User');

var UserService = require(ROOT + '/services/UserService');

exports.get = function (request, res) {
	Log("/api/auth/getNewestUsers()");
	
	var body = request.body;
	var username = body.username;

	var user = UserService.findByUsername(username);
	
	Promise.all([user]).then(function () {

		var responseData = {
			success: false,
			message: 'error?'
		};
		
		console.log(JSON.stringify(user));

		if (user == null) {
			responseData.success = false;
			responseData.message = "no data";
		} else {
			responseData.success = true;
			responseData.message = "SUCCESS";
			responseData.userData = user;
		}

		res.end(JSON.stringify(responseData));
	});

};
