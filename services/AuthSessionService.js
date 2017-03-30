
// models
var UserSession = require(ROOT + '/models/UserSession');
var User = require(ROOT + '/models/User');

// services
var UserService = require(ROOT + '/services/UserService');

// method
exports.getSession = function (request) {

	return new Promise(function (resolve, reject) {
		Log("service ... getSession()");

		var token = request.headers.token;

		var responseData = {
			success: false,
			message: 'error?'
		};

		if (StringUtils.isEmpty(token)) {
			resolve(responseData);
		}

		var session = null;
		var error = false;

		var getUserSession = UserSession.findOne({
				"token": token
			}, function (err, response) {

				if (err) {
					Log("getSession.UserSession.findOne() error");
					error = true;
				} else {
					session = response;

					if (session == null || session == undefined) {
						error = true;
					}
				}
			});

		Promise.all([getUserSession]).then(function () {

			if (error) {
				Log("errors");

				responseData.success = false;
				responseData.message = 'Lietotajs vai viņa sesija netika atrasts!';

				resolve(responseData);
			} else {

				var user = null;

				var getUserData = UserService.findByUsername(session.username).then(function (value) {
						user = value;
					});

				Promise.all([getUserData]).then(function () {

					if (Utils.isNull(user)) {
						responseData.success = false;
						responseData.message = 'Lietotajs netika atrasts!';

						resolve(responseData);
					}

					if (!StringUtils.isEqual(session.pass, user.password)) {

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

						resolve(responseData);
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

						resolve(responseData);
					}
				});

			}

		});

	});

};
