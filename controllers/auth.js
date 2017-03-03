var fs = require('fs');

var mongoose = require('mongoose');

var con = mongoose.connection;

con.on('connected', function () {
  console.log('Mongoose SUCCESS');
});
con.on('error',function (err) {
  console.log('Mongoose ERROR');
});

var UserSession = require('../models/UserSession');


exports.getSession = function(req, res) {
    console.log("getSession()");

    var body = req.body;
    var token = body.token;
	
	var responseData = {
		success : false,
		message : 'error?'
	};

    console.log("body:" + JSON.stringify(body) );
    console.log("token:" + token );
	
	if( typeof token === 'undefined' || !token ){
		res.end(JSON.stringify(responseData));
	}

    UserSession.findOne({"token":token}, function (err, resp) {
      if (err){
        console.log("findOne() error");
        res.end("findOne() error");
      }

      if(resp == null || resp == undefined){
        console.log("Sesija netika atrasta");
        res.end("Sesija netika atrasta: " + JSON.stringify(body));
		

        var session = new UserSession();
        session.token = token;
        session.userId = 1;
        session.created = 2;

        session.save(function(err) {
          if (err){
          console.log("Create error");
            res.end(err);
          }

          console.log("Session created!");
          res.end("Session created!");
        });

      }
	  else{
        console.log("Sesija atrasta");
	  }

    });
};
