
// models
var Story = require(ROOT + '/models/Story');

var NewsService = require(ROOT + '/services/NewsService');

// method
exports.getAll = function (request, res) {
	Log("/api/news/getAll()");

	var news = new Array();

	var resp = NewsService.findStories(3).then(function (value) {
			value.forEach(function (story) {
				news.push(story);
			});
		});
	
	Promise.all([resp]).then(function () {

		var responseData = {
			success: false,
			message: 'error?'
		};

		if (news == null) {
			responseData.success = false;
			responseData.message = "no data";
		} else {
			responseData.success = true;
			responseData.message = "SUCCESS";
			responseData.storyList = news;
		}
		
		Log("news " + JSON.stringify(news));

		res.end(JSON.stringify(responseData));

	});

};
