var fs = require('fs');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String
});

var con = mongoose.connection;

con.on('connected', function () {
  console.log('Mongoose SUCCESS');
});
con.on('error',function (err) {
  console.log('Mongoose ERROR');
});

var User = mongoose.model('User', UserSchema);


exports.findall = function(req, res) {
    console.log("findall()");

    //fs.readFile( __dirname + "/../" + "users.json", "utf8", function(err, data){
    //    console.log("data");
    //    res.send(data);
    //});

    User.find(function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
};

exports.login = function(req, res) {
    console.log("login()");

    var body = req.body;

    console.log("username:" + body.username + " password:" + body.password );
    //res.end(body);
    res.send(body);
};


exports.register = function(req, res) {
    console.log("login()");

    var body = req.body;
    var username = body.username;
    var password = body.password;

    console.log("username:" + username + " password:" + password );

    User.findOne({"username":username}, function (err, resp) {
      if (err){
        console.log("findOne() error");
        res.end("findOne() error");
      }

      if(resp != null || resp != undefined){
        console.log("Username aiznjemts: " + username);
        res.end("Username aiznjemts: " + username);
      }
      else {
        console.log("Creating user...");

        var user = new User();
        user.username = username;
        user.password = password;

        user.save(function(err) {
          if (err){
          console.log("Create error");
            res.end(err);
          }

          console.log("User created!");
          res.end("User created!");
        });
      }

    });

};
