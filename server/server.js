///LIST DEPENDENCIES
var express = require('express');
// var Sequelize = require('sequelize');
// var pg = require('pg');
var utils = require('./utils.js');
var bodyParser = require('body-parser');
// var Q = require('q');

////SET VARIABLES  
var port = 3000;

////CONNECT TO SERVER
var app = express();
app.listen(process.env.PORT || port, function () {
	console.log('Server listening at ' + port);
});


app.use(express.static(__dirname + '/../dummy.html'));


/////////MIDDLEWARE//////////
// var fetchDaPhoto = Q.nbind(utils.getDailyPhoto, utils);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-promise')());

///////////ROUTES///////////

///HOMEPAGE
app.get('/', function (req, res) {
	res.send('Heyyy bitchez');
});

////////////////////////////////////
////////////////USERS SECTION
//get sign-in info>
app.get('/users/signin', function (req, res) {
	res.send('bichez b signing in');
});

//add a new user
app.post('/users/create', function (req, res) {
	res.send('bichez b signing in');
});

////////////////////////////////////
//////////////////PHOTOS SECTION

//get the daily photo
app.get('/photos/giveusthisday', function(req, res) {
	utils.getDailyPhoto(res.send);
});
//get all of the photos
app.get('/photos', function (req, res) {
	res.send(utils.getAllPhotos());
});
// user adds a photo
app.post('/photos', function (req, res) {	
	res.send(utils.postPhoto(req.body));
});

////////////////////////////////////
///////////////CAPTIONS SECTION

//get all captions for daily photo
app.get('/captions', function (req, res) {
	//first: get the id of the photo.
	var dailyPhotoId = utils.getDailyPhoto(function (photoOrErr){
		if (photoOrErr instanceof Error){
			console.log('Error retrieving daily photo: ', err);
		} else {
			console.log(photoOrErr);
			//return photoOrErr.id
		}
	});
	//then:    ***OF DAILY PHOTO ID***
	utils.getPhotoCaptions(dailyPhotoId, res.send);
});

//user posts caption on a photo
app.post('/captions', function (req, res) {
	res.send('bichez b postin up word');
});

////////////////////////////////////
///////////////GoDDAMN the FAVICON
//just appease the request
app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200);
});
