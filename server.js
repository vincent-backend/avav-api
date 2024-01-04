/** *
 * API Server
*/

var express = require('express')
  , logger = require('morgan')
  , http = require('http')
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser')
  , errorHandler = require('errorhandler');

var app = express();

app.set('port', process.env.PORT || 80);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

// models
var models = require("./models");

// routes
var ArtVotes = require('./routes/avav_art');

//Sync Database
models.sequelize.sync().then(function() {
    console.log('connected to database')
}).catch(function(err) {
    console.log(err)
});

// cors
const cors=require("cors");
const corsOptions ={
   origin: "*", 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

// register routes
app.use('/art_votes', ArtVotes);

// 404
app.get('*', (req, res) => {
    res.status(404).send({status: 404, message: "Not found"});
});

/// Run server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});