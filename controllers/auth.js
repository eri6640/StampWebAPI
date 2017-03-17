
var UserSession = require( '../models/UserSession' );
var User = require( '../models/User' );

//var Util = require( '../utils/util.js' );

var isEmpty = function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

var isEqual = function isEmpty(value, value2) {
	return new String(value).valueOf() == new String(value2).valueOf();
}

var isTooShort = function (value, len) {
	return value.length <= len;
};


exports.getSession = function( req, res ) {
    console.log( "getSession()" );

    var body = req.body;
    var token = body.token;

    var responseData = {
		success : false,
		message : 'error?'
    };

    console.log( "body:" + JSON.stringify( body ) );
    console.log( "token:" + token );

    if ( isEmpty(token) ) {
		res.end( JSON.stringify( responseData ) );
    }

    UserSession.findOne( {
	"token" : token
    }, function( err, sessionResp ) {

		if ( err ) {
			console.log( "findOne() error" );
			res.end( "findOne() error" );
		}

		if ( sessionResp == null || sessionResp == undefined ) {
			console.log( "Sesija netika atrasta" );
			// res.end("Sesija netika atrasta: " + JSON.stringify(body));

			/**var session = new UserSession();

			session.token = token;
			session.userId = "";
			session.created = parseInt( new Date().getTime() / 1000 );

			session.save( function( err ) {
				if ( err ) {
					console.log( "Create error" );
					res.end( JSON.stringify( responseData ) );
				}

				console.log( "Session created!" );

				responseData.success = true;
				responseData.message = 'Session created!';

				res.end( JSON.stringify( responseData ) );
			} );**/

		}
		else {
			console.log( "Sesija atrasta ===>>> " + JSON.stringify( sessionResp ) );
			
			responseData.success = false;
			responseData.message = 'Sesija atrasta, bet nederiga!';
			
			var sessionUserName = sessionResp.username;
			
			if( !isEmpty(sessionUserName) ){
				console.log( "sessionUserName ===>>> " + sessionUserName );
				
				User.findOne({"username":sessionUserName}, function (err, userResp) {
					if (err){
						console.log("findOne() error");
						userResp = null;
					}
					
					console.log( "UserData===>>> " + JSON.stringify( userResp ) );

					if(userResp == null || userResp == undefined){
						
						responseData.success = false;
						responseData.message = 'Netika atrasts lietotajs';
						responseData.userData = null;
						
					}
					else if( ! isEqual(sessionResp.pass, userResp.password) ){
						
						
						responseData.success = false;
						responseData.message = 'Novecojusi sesija';
						responseData.userData = null;

						//UserSession.findOne({ "token" : token }).remove( callback );
						
						UserSession.remove({ _id: userResp._id }, function(err) {
							if (!err) {
								responseData.message = 'sesijas dzeshanas errors';
							}
							else {
								responseData.message = 'vecaa sesija veiksmigi izdzesta';
							}
						});
						
					}
					else {
						
						responseData.success = true;
						responseData.message = 'SUCCESS';
						
						responseData.userData = {
							userId : userResp._id,
							username : userResp.username,
							name : userResp.name,
							surname : userResp.surname,
							created : userResp.created

						};

					}
					
					res.end( JSON.stringify( responseData ) );
				});

			}else{
				console.log("error");
				res.end( JSON.stringify( responseData ) );
			}
		}

    } );
};
