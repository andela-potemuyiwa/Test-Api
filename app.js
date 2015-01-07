var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var port = process.env.PORT || 5555;

var mongoose = require('mongoose');
var dance;

mongoose.connect('mongodb://localhost/dances');

var Dances = mongoose.model('Dances', { 

  name: {
    type: String,
    required: true
  },
  creator: String,
  where_created: String,
  popularity: Number

});


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
];
//dumping data into db :)

dances.forEach(function(element, index){
  
  dance = new Dances(element);
  dance.save();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/api', router);

// Define controller for the API's route.
router.route('/')
	.get(function (req, res) {
		res.send("Welcome to Our Dance Api...Don't Get It Twisted");
	});

// Define GET and POST controllers for the 'dances' endpoint.
router.route('/dances')

  // GET request controller.
  .get(function(req, res) {
  	res.json( dances );
	})

	// POST request handler.
	.post(function(req, res, next){

			var values = req.body;

			console.log(req.body.name || 'Hekk');

			dances.push(values);

			res.json( dances );

			next();
	});

// Define GET, PUT and DELETE controllers for the 'dances/:name' endpoint.
router.route('/dances/:name')

  // GET request controller.
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
	})

  // PUT request controller.
	.put(function (req, res) {
		var dance_name = req.params.name.toLowerCase();

		for (var i = 0; i < dances.length; i++) {
			if(dances[i].name === dance_name) {
				dances[i] = req.body;
				res.json(dances);
			} else {
				res.status(404).json({
					"message": "Dance not found"
				});
		  }
		}
	})

	// DELETE request controller
	.delete(function (req, res) {
		var dance_name = req.params.name.toLowerCase();

		dances = dances.filter(function (item) {
			return item.name !== dance_name;
		});

    res.json(dances);
	});


app.listen(port, function(){
	console.log("Server running at localhost " + port);
});
