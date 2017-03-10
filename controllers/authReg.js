
var User = require( '../models/User' );

//var Util = require( '../utils/util.js' );

var isEmpty = function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

exports.reg = function( req, res ) {
    console.log( "reg()" );

    var body = req.body;
	
    var username = body.username;
    var name = body.name;
    var surname = body.surname;
    var email = body.email;
    var pass = body.password;

    var responseData = {
		success : false,
		message : 'error?'
    };

    console.log( "body:" + JSON.stringify( body ) );
    console.log( "username:" + username );

    if ( isEmpty(username) || isEmpty(name) || isEmpty(surname) || isEmpty(email) || isEmpty(pass) ) {
		
		responseData.success = false;
		responseData.message = 'Nepieciesams aizpildit visus laukus';
			
		res.end( JSON.stringify( responseData ) );
    }
	
	var checkErrors = false;
	
	var checkUsername = User.find({'username': username}, function (err, users) {
		if (users.length){
			checkErrors = true;
		}
		else{
			checkErrors = false;
		}
		console.log('checkUsername() done');
	});
	
	var checkEmail = User.find({'email': email}, function (err, users) {
		if (users.length){
			checkErrors = true;
		}
		else{
			checkErrors = false;
		}
		console.log('checkEmail() done');
	});
	
	Promise.all([checkUsername, checkEmail]).then( function () { 

		if(checkErrors === false){
			console.log( "no errors" );
			var user = new User();

			user.username = username,
			user.name = name,
			user.surname = surname,
			user.email = email,
			user.password = pass,
			user.created = parseInt( new Date().getTime() / 1000 );

			user.save( function( err ) {
				if ( err ) {
					console.log( "Create error" );
					res.end( JSON.stringify( responseData ) );
				}

				console.log( "User created!" );

				responseData.success = true;
				responseData.message = 'User created!';

				res.end( JSON.stringify( responseData ) );
			} );
		}
		else{
			console.log( "gggg --- FALSE" );
		}
	});
	
	
		
	
	
};
