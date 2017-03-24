
// models
var User = require(ROOT + '/models/User');

// method
exports.register = function (req, res) {
	console.log("/api/auth/register()");

	var body = req.body;

	var username = body.username;
	var name = body.name;
	var surname = body.surname;
	var email = body.email;
	var pass = body.password;

	var responseData = {
		success: false,
		message: 'error?'
	};

	if (StringUtils.isEmpty(username) || StringUtils.isEmpty(name) || StringUtils.isEmpty(surname) ||
		StringUtils.isEmpty(email) || StringUtils.isEmpty(pass)) {

		responseData.success = false;
		responseData.message = 'Nepieciesams aizpildit visus laukus';

		res.end(JSON.stringify(responseData));
	}

	if (StringUtils.isTooShort(username, 3)) {

		responseData.success = false;
		responseData.message = 'Segvarda vai paroles lauka garums ir parak iss!';

		res.end(JSON.stringify(responseData));
	}

	var checkErrors = false;

	var checkUsername = User.find({
			'username': username
		}, function (err, users) {
			if (users.length) {
				checkErrors = true;
			} else {
				checkErrors = false;
			}
		});

	var checkEmail = User.find({
			'email': email
		}, function (err, users) {
			if (users.length) {
				checkErrors = true;
			} else {
				checkErrors = false;
			}
		});

	Promise.all([checkUsername, checkEmail]).then(function () {

		if (checkErrors === false) {

			var user = new User();

			user.username = username;
			user.name = name;
			user.surname = surname;
			user.email = email;
			user.password = pass;
			user.created = parseInt(new Date().getTime() / 1000);

			user.save(function (err) {
				if (err) {
					console.log("Create error");
					res.end(JSON.stringify(responseData));
				}

				responseData.success = true;
				responseData.message = 'User created!';

				res.end(JSON.stringify(responseData));
			});
		} else {
			console.log("ERRORS");
		}
	});

};
