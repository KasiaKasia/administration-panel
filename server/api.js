const express = require('express');
<<<<<<< HEAD
const router  = express.Router();
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('./config');
=======
const router  = express.Router(); 
var morgan    = require('morgan');
var mongoose  = require('mongoose'); 
var config    = require('./config');
>>>>>>> origin/master


mongoose.connect(config.database, function(err){
	if(err) {
		console.log('Error connecting database, please check if MongoDB is running.');
	} else {
		console.log('Connected to database...');
	}
});

module.exports = router;
