
var StampService = require(ROOT + '/services/StampService');

// method
exports.get = function (request, res) {
	Log("/api/stamps/findUserStamps()");
	
	var body = request.body;

	var username = body.username;
	
	Log("username " + username);

	var stamps = new Array();

	var resp = StampService.findUserStamps(username).then(function (value) {
			
			Log("size " + value.length);
		
			value.forEach(function (stamp) {
				stamps.push(stamp);
			});
		});
	
	Promise.all([resp]).then(function () {

		var responseData = {
			success: false,
			message: 'error?'
		};

		if (stamps == null) {
			responseData.success = false;
			responseData.message = "no data";
		} else {
			responseData.success = true;
			responseData.message = "SUCCESS";
			responseData.stampList = stamps;
		}
		
		Log("stamps " + JSON.stringify(stamps));

		res.end(JSON.stringify(responseData));

	});

};