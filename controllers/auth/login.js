
// models
var UserSession = require(ROOT + '/models/UserSession');
var User = require(ROOT + '/models/User');

// method
exports.login = function (req, res) {
	console.log("/api/auth/login()");

	var body = req.body;

	var username = body.username;
	var token = body.token;
	var pass = body.password;

	var responseData = {
		success: false,
		message: 'error?'
	};

	if (StringUtils.isEmpty(username) || StringUtils.isEmpty(pass) || StringUtils.isEmpty(token)) {

		responseData.success = false;
		responseData.message = 'Nepieciesams aizpildit visus laukus';

		res.end(JSON.stringify(responseData));
	}

	var errors = false;

	var checkUserData = User.findOne({
			'username': username
		}, function (err, userResp) {
			if (err) {
				console.log("login.UserfindOne() error");
				userResp = null;
				errors = true;
			}

			if (errors === false) {

				if (!StringUtils.isEqual(pass, userResp.password)) {
					errors = true;
				}

			}

		});

	Promise.all([checkUserData]).then(function () {

		if (errors === false) {
			console.log("no errors");

			var session = new UserSession();

			session.token = token;
			session.username = username;
			session.pass = pass;
			session.used = parseInt(new Date().getTime() / 1000);

			session.save(function (err) {
				if (err) {
					console.log("Create error");
					res.end(JSON.stringify(responseData));
				}

				responseData.success = true;
				responseData.message = 'Pierakstishanas veikta!';

				res.end(JSON.stringify(responseData));
			});
		} else {
			console.log("ERRORS");
		}
	});

};

exports.logout = function (req, res) {
	console.log("/api/auth/logout()");

	var body = req.body;

	var token = body.token;

	UserSession.remove({
		token: token
	}, function (err) {
		if (!err) {
			// do something?!
		}
	});

};
