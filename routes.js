
module.exports = function (app) {

	var auth = require('./controllers/auth');
	var user = require('./controllers/user');
	var news = require('./controllers/news');
	var stamps = require('./controllers/stamps');

	app.post('/api/auth/getSession', auth.getSession);
	app.post('/api/auth/login', auth.login);
	app.post('/api/auth/logout', auth.logout);
	app.post('/api/auth/reg', auth.register);

	app.post('/api/user/getNewestUsers', user.getNewestUsers);
	app.post('/api/user/getUserByUsername', user.getUserByUsernameSafe);

	app.post('/api/user/addStampToCollection', user.addStampToCollection);

	app.post('/api/news/add', news.add);
	app.post('/api/news/getAll', news.getAll);

	app.post('/api/stamps/search', stamps.search);
	app.post('/api/stamps/add', stamps.add);


	app.post('/api/stamps/getUserStamps', stamps.userStamps);

	//app.post('/api/stamps/getByName', stamps.search); // TODO

	//app.post('/users', users.login);
	//app.post('/users/register', users.register);
}
