
module.exports = function (app) {

	var auth = require('./controllers/auth');
	var user = require('./controllers/user');

	app.post('/api/auth/getSession', auth.getSession);
	app.post('/api/auth/login', auth.login);
	app.post('/api/auth/logout', auth.logout);
	app.post('/api/auth/reg', auth.register);
	
	app.post('/api/user/getNewestUsers', user.getNewestUsers);

	//app.post('/users', users.login);
	//app.post('/users/register', users.register);
}
