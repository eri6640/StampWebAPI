
var User = require(ROOT + '/models/User');

var UserService = require(ROOT + '/services/userService');

exports.getNewestUsers = function (req, res) {
	console.log("/api/auth/getNewestUsers()");

	var users = new Array();

	var resp = UserService.findNewestUsers(3).then(function (value) {
			value.forEach(function (user) {
				users.push(UserUtils.safe(user));
			});
		});
	
	Promise.all([resp]).then(function () {

		var responseData = {
			success: false,
			message: 'error?'
		};

		if (users == null) {
			responseData.success = false;
			responseData.message = "no data";
		} else {
			responseData.success = true;
			responseData.message = "SUCCESS";
			responseData.userList = users;
		}

		res.end(JSON.stringify(responseData));

	});
	
	

};
