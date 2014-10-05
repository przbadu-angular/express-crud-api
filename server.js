// BASE SETUP

var express 		= require("express"),						// call express
		app 				= express(), 										// define our app using express
		bodyParser 	= require('body-parser'),				// call body-parser
  	mongoose 		= require('mongoose'),					// call mongoose
  	User 				= require('./app/models/user'); // use local module that we created for user schema


// https://modulus.io/user/30449/dbs
// refer to above url to create mongo db and set url here
// OR create mongo db database locally and set that url e.g: /dbname
mongoose.connect('mongodb://node:node@proximus.modulusmongo.net:27017/oxiB3osu'); // connect to modulus.io database that we created OR
// mongoose.connect('mongodb://localhost/crud-api'); 		// connect to localhost mongo db database




// configure app to use bodyParser so that
// this will let us get the data from a POST 
// throuh request handler
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000 		// set our port







// ROUTES FOR OUR API
var router = express.Router(); 		// get an instance of express Router


// middleware to use for all requests
router.use(function (req, res, next) {
	console.log('Something is happening');
	next();		// make sure we go to the next routes and don't stop here
});


// test route to make sure everyting is working
// GET http://localhost:3000/api
router.get('/', function (req, res) {
	res.json({ message: 'hooray! I am working fine ;)' });
});




// MORE ROUTES FOR OUR API GOES HERE

// ON ROUTE THAT ENDS WITH /users
// INDEX and CREATE actions
router.route('/users')

	// POST /api/users
	.post(function (req, res) {

		var user 			= new User(); 					// new object for User Model
		user.name 		= req.body.name; 		// parsed with body-parser. content from form request object
		user.age 			= req.body.age;
		user.email		= req.body.email;
		user.address 	= req.body.address;


		// save user and check for errors if any
		user.save(function (err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created successfully!' });
		});
	})

	// GET api/users
	.get(function (req, res) {
		User.find(function (err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});

// SHOW and UPDATE and DESTROY Action
router.route('/users/:_id')
	
	// GET /api/users/1
	.get(function (req, res) {
		User.findById(req.params._id, function (err, user) {
			if (err)
				res.send(err);

			res.json(user);
		})
	})

	// PUT /api/users/1
	.put(function (req, res) {
		User.findById(req.params._id, function(err, user) {
			if (err)
				res.send(err);

			user.name 		= req.body.name; 		// parsed with body-parser. content from form request object
			user.age 			= req.body.age;
			user.email		= req.body.email;
			user.address 	= req.body.address;

			user.save(function (err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated successfully!' })
			});
		});
	})


	// DELETE /api/users/1
	.delete(function (req, res) {
		User.remove({
			_id: req.params._id
		}, function (err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'User deleted successfully!!' })
		})
	});


// REGISTER OUR ROUTES (prefix with /api)
app.use('/api', router);


// START THE SERVER
app.listen(port);
console.log("Server starting at http://localhost:" + port);