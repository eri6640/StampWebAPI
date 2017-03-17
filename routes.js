
module.exports = function (app) {
	//var users = require('./controllers/users');
	var auth = require('./controllers/auth');
	var authLog = require('./controllers/authLog');
	var authReg = require('./controllers/authReg');

	app.post('/api/auth/getSession', auth.getSession);
	app.post('/api/auth/login', authLog.login);
	app.post('/api/auth/logout', authLog.logout);
	app.post('/api/auth/reg', authReg.reg);

	//app.post('/users', users.login);
	//app.post('/users/register', users.register);
}
