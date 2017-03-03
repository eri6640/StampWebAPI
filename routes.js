
module.exports = function(app) {
    var users = require('./controllers/users');
    app.get('/users', users.findall);
    app.post('/users', users.login);
    app.post('/users/register', users.register);
}
