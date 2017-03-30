
// controllers
var AuthSession = require(ROOT_CONTROLLER + '/auth/session');
var AuthLogin = require(ROOT_CONTROLLER + '/auth/login');
var AuthRegistration = require(ROOT_CONTROLLER + '/auth/registration');


// methods
exports.getSession = AuthSession.getSession;
exports.login = AuthLogin.login;
exports.logout = AuthLogin.logout;
exports.register = AuthRegistration.register;
