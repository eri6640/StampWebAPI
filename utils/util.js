

var isEmpty = function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

//var isNull = function isNull(value) {
//  return typeof value === 'undefined' || value === null;
//}
