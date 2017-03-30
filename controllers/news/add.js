
// models
var Story = require(ROOT + '/models/Story');

// method
exports.add = function (request, res) {
	Log("/api/news/add()");

	var body = request.body;

	var title = body.title;
	var content = body.content;

	var responseData = {
		success: false,
		message: 'error?'
	};

	if (StringUtils.isEmpty(title) || StringUtils.isEmpty(content)) {

		responseData.success = false;
		responseData.message = 'Nepieciesams aizpildit visus laukus';

		res.end(JSON.stringify(responseData));
	}

	if (StringUtils.isTooShort(title, 3) || StringUtils.isTooShort(content, 10)) {

		responseData.success = false;
		responseData.message = 'garums...';

		res.end(JSON.stringify(responseData));
	}
	
	var user = request.responseData.userData;
	
	Log("user.username  " + user.username);

	if (Utils.isNull(user) || StringUtils.isEmpty(user.username)) {

		responseData.success = false;
		responseData.message = 'user data error';

		res.end(JSON.stringify(responseData));
	}
	
	var story = new Story();

	story.title = title;
	story.content = content;
	story.username = user.username;
	story.created = parseInt(new Date().getTime() / 1000);

	story.save(function (err) {
		if (err) {
			Log("Create error");
			res.end(JSON.stringify(responseData));
		}
		
		responseData.success = true;
		responseData.message = 'Story created!';

		res.end(JSON.stringify(responseData));
	});

};
