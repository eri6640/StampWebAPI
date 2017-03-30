
// models
var Stamp = require(ROOT + '/models/Stamp');

// method
exports.add = function (req, res) {
	Log("/api/stamps/add()");

	var body = req.body;

	var name = body.name;
	var description = body.description;
	var year = body.year;
	var picture = body.picture;

	var responseData = {
		success: false,
		message: 'error?'
	};

	if (StringUtils.isEmpty(name) || StringUtils.isEmpty(description) || StringUtils.isEmpty(year) ||
		StringUtils.isEmpty(picture)) {

		responseData.success = false;
		responseData.message = 'Nepieciesams aizpildit visus laukus';

		res.end(JSON.stringify(responseData));
	}

	if (StringUtils.isTooShort(name, 3) || StringUtils.isTooShort(description) || StringUtils.isTooShort(year) ||
		StringUtils.isTooShort(picture)) {

		responseData.success = false;
		responseData.message = 'Kads lauks nesatur pietiekamu simbolu skaitu!';

		res.end(JSON.stringify(responseData));
	}
	
	year = Number(year);
	
	if(year < 1840){
		responseData.success = false;
		responseData.message = 'Problemas ar gadu 2';

		res.end(JSON.stringify(responseData));
	}
	
	/**if(Utils.isImg(picture)){
		responseData.success = false;
		responseData.message = 'Problemas ar img';

		res.end(JSON.stringify(responseData));
	}**/

	var stamp = new Stamp();

	stamp.name = name;
	stamp.description = description;
	stamp.year = year;
	stamp.picture = picture;

	stamp.save(function (err) {
		if (err) {
			Log("Create error");
			res.end(JSON.stringify(responseData));
		}

		responseData.success = true;
		responseData.message = 'Stamp created!';

		res.end(JSON.stringify(responseData));
	});

};
