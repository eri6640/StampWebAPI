
// models
var UserSession = require(ROOT + '/models/UserSession');
var User = require(ROOT + '/models/User');

// services
var UserService = require(ROOT + '/services/userService');

// method
exports.getSession = function (request, res) {
	console.log("/api/auth/getSession()");

	var body = request.body;
	var token = body.token;

	var responseData = {
		success: false,
		message: 'error?'
	};

	//console.log("body:" + JSON.stringify(body));
	//console.log("token:" + token);

	if (StringUtils.isEmpty(token)) {
		res.end(JSON.stringify(responseData));
	}

	var session = null;
	var error = false;

	var getUserSession = UserSession.findOne({
			"token": token
		}, function (err, response) {

			if (err) {
				console.log("getSession.UserSession.findOne() error");
				res.end("getSession.UserSession.findOne() error");
			}

			session = response;

			if (session == null || session == undefined) {

				error = true;
				responseData.message = 'Sesija netika atrasta';

			}

		});
		
	console.log(request.headers);
    console.log(request.url);
	console.log('Cookies: ', request.cookies);

	Promise.all([getUserSession]).then(function () {

		if (error) {
			console.log("errors");

			responseData.success = false;
			responseData.message = 'Lietotajs netika atrasts!';

			res.end(JSON.stringify(responseData));
		} else {

			var user = null;

			var test = UserService.findByUsername(session.username).then(function (value) {
					user = value;
				});

			Promise.all([test]).then(function () {

				if (Utils.isNull(user)) {

					responseData.success = false;
					responseData.message = 'Lietotajs netika atrasts!';

					res.end(JSON.stringify(responseData));
				}

				if (!isEqual(session.pass, user.password)) {

					responseData.success = false;

					UserSession.remove({
						_id: user._id
					}, function (err) {
						if (!err) {
							responseData.message = 'sesijas dzeshanas errors';
						} else {
							responseData.message = 'vecaa sesija veiksmigi izdzesta';
						}
					});

				} else {

					responseData.success = true;
					responseData.message = 'SUCCESS';

					responseData.userData = {
						userId: user._id,
						username: user.username,
						name: user.name,
						surname: user.surname,
						created: user.created
					};

				}

				res.end(JSON.stringify(responseData));

			});

		}

	});

};
