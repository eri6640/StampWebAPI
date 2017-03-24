var User = require('../models/User');

//var Util = require( '../utils/util.js' );

var isEmpty = function isEmpty(value) {
	return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

var isEqual = function isEmpty(value, value2) {
	return new String(value).valueOf() == new String(value2).valueOf();
}

var isTooShort = function (value, len) {
	return value.length <= len;
};

exports.findByUsername = function (username) {

	return User.findOne({
		"username": username
	}, function (err, response) {

		var user = null;

		if (err) {
			console.log("findByUsername.User.findOne() error, " + username);
			user = null;
		} else if (response == null || response == undefined) {
			user = null;
		} else {
			user = response;
		}

		return user;
	});

};

exports.findNewestUsers = function (count) {

	return User.find().sort({
		created: -1
	}).limit(count, function (err, response) {

		res.end(JSON.stringify(response));

	});

};
