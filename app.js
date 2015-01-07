var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

var port = process.env.PORT || 5555;


var dances = [

   {

   	  "name" : "moonwalk",
   	  "creator" : "Michael Jackson",
   	  "where_created": "Atlanta,USA",
   	  "popularity" : 2
   },
   {

   	  "name" : "highlife",
   	  "creator" : "Osadebe",
   	  "where_created": "Enugu,Nigeria",
   	  "popularity" : 3
   },
   {

   	  "name" : "shoki",
   	  "creator" : "Lil Kesh",
   	  "where_created": "Lagos,Nigeria",
   	  "popularity" : 5
   },
   {

   	  "name" : "kukere",
   	  "creator" : "Iyanya",
   	  "where_created": "Lagos, Nigeria",
   	  "popularity" : 5
   },
]



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));


app.use('/api', router);

router.route('/')
	.get(function (req, res) {
		res.send("Welcome to Our Dance Api...Don't Get It Twisted");
	});

// Define routes.
router.route('/dances')

  // GET all dances.
  .get(function(req, res) {
  	res.json( dances );
	})

	// Add a dance to the dance fixture.
	.post(function(req, res, next){

			var values = req.body;

			console.log(req.body.name || 'Hekk');

			dances.push(values);

			res.json( dances );

			next();
	});

router.route('/dances/:name')

  // GET a dance of a specific name.
	.get(function( req, res){

		var dance_name = req.params.name.toLowerCase();
	    var counter = 0;
	    var value;
		for( counter; counter <= dances.length; counter++ ){
			if( dances[counter].name === dance_name ){
				 res.json( dances[counter] );
			}
			else{
				res.status(404).json("Not Found");
			}
		}
	});



app.listen(port, function(){
	console.log("Server running at localhost " + port);
});
