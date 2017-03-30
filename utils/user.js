

exports.safe = function (user) {
	var userData = {
		userId: user._id,
		username: user.username,
		name: user.name,
		surname: user.surname,
		created: user.created
	};
	
	return userData;
};
