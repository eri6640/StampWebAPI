var fs = require( 'fs' );

var mongoose = require( 'mongoose' );

var con = mongoose.connection;

con.on( 'connected', function() {
    console.log( 'Mongoose SUCCESS' );
} );
con.on( 'error', function( err ) {
    console.log( 'Mongoose ERROR' );
} );

var UserSession = require( '../models/UserSession' );
var User = require( '../models/User' );

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

    if ( typeof token === 'undefined' || !token ) {
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

			var session = new UserSession();

			session.token = token;
			session.userId = 0;
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
			} );

		}
		else {
			console.log( "Sesija atrasta ===>>> " + JSON.stringify( sessionResp ) );
			
			responseData.success = true;
			responseData.message = 'Sesija atrasta';
			
			var userId = parseInt(sessionResp.userId);
			
			if( userId > 0 ){
				console.log( "userId ===>>> " + userId );
				
				User.findOne({"userId":userId}, function (err, userResp) {
					if (err){
						console.log("findOne() error");
						userResp = null;
					}
					
					console.log( "UserData===>>> " + JSON.stringify( userResp ) );

					if(userResp == null || userResp == undefined){
						
						responseData.success = true;
						responseData.message = 'Netika atrasts lietotajs';
						responseData.userData = null;
						
					}
					else {
						
						responseData.success = true;
						responseData.message = 'SUCCESS';
						
						responseData.userData = {
							userId : userResp.userId,
							username : 'username?',
							created : 'created?'
						};

					}
					
					res.end( JSON.stringify( responseData ) );
				});

			}else{
				res.end( JSON.stringify( responseData ) );
			}
		}

    } );
};
