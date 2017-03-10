var express = require('express');
var app = express();
var cors = require('cors');

// host
const hostname = '94.23.206.157';
const port = 8090;

// mongo db
var mongoose = require('mongoose');

var mongUrl = 'mongodb://stamps:5dsf64g5gg5@127.0.0.1:27017/Stamps';
mongoose.connect(mongUrl);

var con = mongoose.connection;

con.on( 'connected', function() {
    console.log( 'Mongoose SUCCESS' );
} );
con.on( 'error', function( err ) {
    console.log( 'Mongoose ERROR' );
} );

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//
require('./routes')(app, mongoose);

//
app.listen(port, hostname, function(err){
   console.log("Started static resource server at http://%s:%s", hostname, port)
});
