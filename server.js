
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

// mongo db
var mongoose = require('mongoose');
var mongUrl = 'mongodb://stamps:5dsf64g5gg5@127.0.0.1:27017/Stamps';

mongoose.connect(mongUrl);

var con = mongoose.connection;

con.on('connected', function () {
	console.log('Mongoose ===>>> SUCCESS');
});
con.on('error', function (err) {
	console.log('Mongoose ===>>> ERROR');
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

// routes
require('./routes')(app, mongoose);

// server listen
app.listen(port, hostname, function (err) {
	console.log("Server ===>>> http://%s:%s", hostname, port)
});
