///LIST DEPENDENCIES
const express = require('express');
const utils = require('./server/utils.js');
const bodyParser = require('body-parser');
const altPort = 3000;
const oneDay = 86400000;
const cronJob = require('./server/cronjob.js');

////CONNECT TO SERVER
const app = express();
app.listen(process.env.PORT || altPort, function () {
	console.log('Server listening at ' + altPort);
});


app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/font-awesome', express.static(__dirname + '/public/font-awesome'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));


/////////MIDDLEWARE//////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-promise')());

cronJob.start();
///////////ROUTES///////////

///HOMEPAGE
app.get('/', function (req, res) {
	res.sendFile('index.html', { root: __dirname + '/public/' });
});

////////////////////////////////////
////////////////USERS SECTION

//retrieving sign in info
app.get('/users/info', function (req, res) {
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
	utils.getAllPhotos(res.json)
});
// user adds a photo
app.post('/photos', function (req, res) {	
	console.log('req.body is', req.body)
	utils.postPhoto(req.body, res.json);
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
	utils.upVoteCaption(req.body.captionId, res.json);
});

//endpoint for downvoting captions
app.put('/captions/downvote', function (req, res) {
	utils.downVoteCaption(req.body.captionId, res.json);
});


//endpoint for getting likes, dislikes, total votes
app.get('/captions/getvotes', function (req, res) {
	utils.displayCaptionVotes(req.query.captionId, res.json);
});


////////////////////////////////////
/////////////// FAVICON:
//just appease the request
app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200);
});
