var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


app.get("/", function( req, res){
	res.send("Welcome to this tutorial  using Express");
});

app.listen(3000, function(){
	console.log("Server running at localhost:3000");
});