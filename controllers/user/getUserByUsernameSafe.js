
var User = require(ROOT + '/models/User');

var UserService = require(ROOT + '/services/UserService');

exports.get = function (request, res) {
	Log("/api/auth/getUserByUsernameSafe()");
	
	var body = request.body;
	var username = body.username;

	UserService.findByUsername(username).then(function ( user ) {

		var responseData = {
			success: false,
			message: 'error?'
		};
		
		console.log("asdf");
		
		
		console.log("ss " +  user.username);
		user = UserUtils.safe(user);
		
		console.log(JSON.stringify(user));

		if (user == null) {
			responseData.success = false;
			responseData.message = "no data";
		} else {
			responseData.success = true;
			responseData.message = "SUCCESS";
			responseData.userData = user;
		}

		console.log('te? ' + responseData.success);
		res.end(JSON.stringify(responseData));
	});

};
