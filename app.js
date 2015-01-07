var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();




var dances = [

   {

   	  "name" : "Moonwalk",
   	  "creator" : "Michael Jackson",
   	  "where_created": "Atlanta,USA",
   	  "popularity" : 2
   },
   {

   	  "name" : "HighLife",
   	  "creator" : "Osadebe",
   	  "where_created": "Enugu,Nigeria",
   	  "popularity" : 3
   },
   {

   	  "name" : "Shoki",
   	  "creator" : "Lil Kesh",
   	  "where_created": "Lagos,Nigeria",
   	  "popularity" : 5
   },
   {

   	  "name" : "Kukere",
   	  "creator" : "Iyanya",
   	  "where_created": "Lagos, Nigeria",
   	  "popularity" : 5
   }
]




app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));


app.use('/api', router);

router.get('/', function(req, res){
	res.send("Welcome to Our Dance Api...Don't Get It Twisted");
});

router.get('/dances', function(req, res) {
  res.json( dances );
});

router.post('/dances', function(req, res, next){
   
    var values = req.body;

    console.log(req.body.name || 'Hekk');

    dances.push(values);

    res.json( dances );
    
    next();
});

app.listen(3000, function(){
	console.log("Server running at localhost:3000");
});