
exports.isEmpty = function (value) {
	return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

exports.isEqual = function (value, value2) {
	return new String(value).valueOf() == new String(value2).valueOf();
}

exports.isTooShort = function (value, len) {
	return value.length < len;
};

exports.isTooLong = function (value, len) {
	return value.length > len;
};

