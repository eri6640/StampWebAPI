
module.exports = function(app) {
    //var users = require('./controllers/users');
    var auth = require('./controllers/auth');
    var authReg = require('./controllers/authReg');
	
    app.post('/api/auth/getSession', auth.getSession);
    app.post('/api/auth/reg', authReg.reg);
	
	
    //app.post('/users', users.login);
    //app.post('/users/register', users.register);
}
