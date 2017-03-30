var Story = require('../models/Story');

exports.findStories = function (count) {

	return Story.find().sort({
		created: -1
	}).limit(count, function (err, response) {
		res.end(JSON.stringify(response));
	});
};
