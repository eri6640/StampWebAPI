
var StampService = require(ROOT + '/services/StampService');

// method
exports.search = function (request, res) {
	Log("/api/stamps/search()");
	
	var body = request.body;

	var name = body.name;
	
	Log("name " + name);

	var stamps = new Array();

	var resp = StampService.findStamps(name).then(function (value) {
			
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