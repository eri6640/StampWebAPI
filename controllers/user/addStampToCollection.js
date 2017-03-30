var StampService = require(ROOT + '/services/StampService');
// models
var UserStamp = require(ROOT + '/models/UserStamp');

// method
exports.add = function (request, res) {
	Log("/api/news/addStampToCollection()");

	var body = request.body;
	var stampId = body.stampId;

	var responseData = {
		success: false,
		message: 'error?'
	};

	if ( StringUtils.isEmpty(stampId)) {

		responseData.success = false;
		responseData.message = 'Nepieciesams username vai stampId';

		res.end(JSON.stringify(responseData));
	}

	var user = request.responseData.userData;

	Log("user.username  " + user.username);

	if (Utils.isNull(user) || StringUtils.isEmpty(user.username)) {

		responseData.success = false;
		responseData.message = 'user data error';

		res.end(JSON.stringify(responseData));
	}
	var stampExist = false;
	var resp = StampService.findStamp(stampId).then(function (value) {

			Log("value " + JSON.stringify(value));
		if(!Utils.isNull(value)){
			stampExist = true;
		}

		});

	Promise.all([resp]).then(function () {
		if(stampExist){
				var userStamp = new UserStamp();

				userStamp.username = user.username;
				userStamp.created = stampId;

				userStamp.save(function (err) {
					if (err) {
						Log("Create error");
						res.end(JSON.stringify(responseData));
					}

					responseData.success = true;
					responseData.message = 'userStamp created!';

					res.end(JSON.stringify(responseData));
				});
		}
		else {
			responseData.success = false;
			responseData.message = 'userStamp error!';

			res.end(JSON.stringify(responseData));
		}

	});
};
