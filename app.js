var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    router = express.Router(),

    port = process.env.PORT || 3000,

    app = express(),

    mongoose = require('mongoose'),

    dance = {} ;

    mongoose.connect('mongodb://unicodeveloper:pote1142@ds031661.mongolab.com:31661/dances');

    var Dances = mongoose.model('Dances', { 

    name: {
      type: String,
      unique: true,
      required: true
    },
    creator: String,
    where_created: String,
    popularity: Number

  });



/*var dances = [

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
*/

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
    Dances.find(function (err, dances) {

      if (err) {
        res.send(err);
      }

    res.json(dances);

    });

	})

	// POST request handler.
	.post(function(req, res, next){

			var values = req.body;

			dance = new Dances(values);

      dance.save(function (err, saved_dance) {
        if (err) {
          res.end(err);
        }

        res.send(saved_dance)
      }); 

			res.json( dances );

			next();
	});

// Define GET, PUT and DELETE controllers for the 'dances/:name' endpoint.
router.route('/dances/:name')

  // GET request controller.
	.get(function( req, res){

		var dance_name = req.params.name.toLowerCase();

    Dances.find({name: dance_name}, function (err, dance) {

      if (err) {
        res.status(404).json("Not Found");
      }

      res.json(dance);
    });

  })

  // PUT request controller.
	.put(function (req, res) {
		var dance_name = req.params.name.toLowerCase(), 
      dance = req.body;

    Dance.update({name: dance_name}, dance, function (err) {
      if (err) {
        res.status(404).json("Not Found");
      }

      res.status(200).json("Update Successful");

    });
	})

	// DELETE request controller
	.delete(function (req, res) {

		var dance_name = req.params.name.toLowerCase();

		Dances.remove({name: dance_name}, function (err, dance) {

      if (err) {
        res.status(404).json("Not Found");
      }

      res.json(dance); 
    });

	});


app.listen(port, function(){
	console.log("Server running at localhost " + port);
});
