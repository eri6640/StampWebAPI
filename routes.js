
module.exports = function(app) {
    //var users = require('./controllers/users');
    var auth = require('./controllers/auth');
	
    app.post('/api/auth/getSession', auth.getSession);
	
	
    //app.post('/users', users.login);
    //app.post('/users/register', users.register);
}
