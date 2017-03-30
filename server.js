/************/
/************************/
/************/
/************************/
/************/
/************************/
/************/

var express = require('express');
var app = express();
var cors = require('cors');

// cors
app.use(cors());

// host
const hostname = '94.23.206.157';
const port = 8090;

// server root
var path = require('path');
global.ROOT = path.resolve(__dirname);
global.ROOT_CONTROLLER = ROOT + '/controllers';

// utils
global.Utils = require('./utils/util.js');
global.UserUtils = require('./utils/user.js');
global.StringUtils = require('./utils/string.js');

global.Log = function (string) {

	var d = new Date();
	var formatNumber = function (number) {

		if (number < 10) {
			number = '0' + number;
		}

		return number;
	};

	var date = formatNumber(d.getHours()) + ":" + formatNumber(d.getMinutes()) + ":" + formatNumber(d.getSeconds());

	console.log(date + " - " + string);
};

// mongo db
var mongoose = require('mongoose');
var mongUrl = 'mongodb://stamps:5dsf64g5gg5@127.0.0.1:27017/Stamps';

mongoose.connect(mongUrl);

var con = mongoose.connection;

con.on('connected', function () {
	Log('Mongoose SUCCESS');
});
con.on('error', function (err) {
	Log('Mongoose ERROR');
});

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
		extended: true
	}));

// cookie parser
var cookieParser = require('cookie-parser')
	app.use(cookieParser());

var SessionService = require(ROOT + '/services/AuthSessionService');

app.use(function (request, res, next) {

	var session = SessionService.getSession(request);

	session.then(function (responseData) {
		Log("Promise");

		request.responseData = responseData;

		Log("session response: ", JSON.stringify(responseData));

		next();

	});
});

// routes
require('./routes')(app, mongoose);

// server listen
app.listen(port, hostname, function (err) {
	Log("Server address: http://" + hostname + ":" + port);
});
