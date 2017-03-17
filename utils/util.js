

var isEqual = function isEmpty(value, value2) {
	return new String(value).valueOf() == new String(value2).valueOf();
}

var isTooShort = function (value, len) {
	return value.length <= len;
};

//var isEmpty = function isEmpty(value) {
//	return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
//}
