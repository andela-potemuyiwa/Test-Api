var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var routes = require('./routes');
var app = express();

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://unicodeveloper:pote1142@ds031661.mongolab.com:31661/dances');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/api', router);
routes(router);

api.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,HEAD');

  next();
});

app.listen(port, function(){
	//console.log('Server running at localhost ' + port);
});
