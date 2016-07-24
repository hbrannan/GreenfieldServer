///LIST DEPENDENCIES
const express = require('express');
const utils = require('./utils.js');
const bodyParser = require('body-parser');
const altPort = 3000;

////CONNECT TO SERVER
const app = express();
app.listen(process.env.PORT || altPort, function () {
	console.log('Server listening at ' + altPort);
});


app.use(express.static(__dirname + '/public'));


/////////MIDDLEWARE//////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-promise')());

///////////ROUTES///////////

///HOMEPAGE
app.get('/', function (req, res) {
	res.render('/public/index.html');
});

////////////////////////////////////
////////////////USERS SECTION

//retrieving sign in info
app.get('/users/info', function (req, res) {
	console.log("req is: ",req)
  utils.getUserInfo(req.query.id, res.json);
});

//updating sign-in info MVP?!??!!? resubmit the whole form?
app.put('/users/info', function (req, res) {
	utils.updateUserInfo(req.body, res.json);
});

//adding a new user
app.post('/users/create', function (req, res) {
	utils.addUser(req.body, res.json);
});

//checking fb access to authenticate?
app.post('/users/authenticated', function(req, res) {
	console.log('user is being authenticated');
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

app.get('/captions', function(req, res) {
	utils.getAllCaptions(res.send);
});


//get all captions for daily photo
app.get('/captions/giveusthisday', function (req, res) {
	// get the id of daily photo.
	return utils.getDailyPhoto(function (photoOrErr){
		if (photoOrErr instanceof Error){
			console.log('Error retrieving daily photo: ', err);
		} else {
		//then: get all captions of that photo!
			return utils.getPhotoCaptions(photoOrErr.id, res.send);
		}
	});
	 
});


//user posts caption on a photo
app.post('/captions/giveusthisday', function (req, res) {
	utils.postCaption(req.body, res.json);
});

//endpoint for upvoting captions: 
app.put('/captions/upvote', function (req, res) {
	res.send(utils.upVoteCaption(req.body.captionId));
});

//endpoint for downvoting captions
app.put('/captions/downvote', function (req, res) {
	res.send(utils.downVoteCaption(Number(req.body.captionId)));
});


//endpoint for getting likes, dislikes, total votes
app.get('/captions/getvotes', function (req, res) {
	utils.displayCaptionVotes(req.query.captionId, res.send);
});


////////////////////////////////////
/////////////// FAVICON:
//just appease the request
app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200);
});
