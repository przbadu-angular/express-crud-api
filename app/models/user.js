var mongoose 		= require('mongoose'),
 		schema 			= mongoose.Schema;

var UserSchema 	= new mongoose.Schema({
	name: String,
	age: Number,
	email: String,
	address: String
});


module.exports 	= mongoose.model('User', UserSchema);