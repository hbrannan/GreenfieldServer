///LIST DEPENDENCIES
const express = require('express');
// const Sequelize = require('sequelize');
// const pg = require('pg');
const utils = require('./utils.js');
const bodyParser = require('body-parser');
// const Q = require('q');

////SET VARIABLES  
const port = 3000;

////CONNECT TO SERVER
const app = express();
app.listen(process.env.PORT || port, function () {
	console.log('Server listening at ' + port);
});


app.use(express.static(__dirname + '/../dummy.html'));


/////////MIDDLEWARE//////////
// const fetchDaPhoto = Q.nbind(utils.getDailyPhoto, utils);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-promise')());

///////////ROUTES///////////

///HOMEPAGE
app.get('/', function (req, res) {
	res.send('Heyyy bitchez lololol 4 life!');
});

////////////////////////////////////
////////////////USERS SECTION

//retrieving sign in info
app.get('/users/info', function (req, res) {
	console.log('bichez b signing in');
  console.log('signN reqBody shoudl B singL usR', req.body);
  res.send(utils.getUserInfo(queryBody));
});

//updating sign-in info MVP?!??!!? resubmit the whole form?
app.put('/users/info', function (req, res) {
  console.log('updatesignN reqBody (usR)', req.body);
  res.send(utils.updateUserInfo(req.body));
});

//adding a new user
app.post('/users/create', function (req, res) {
  console.log('creating new user!!!');
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

/*YO!! maybe have /captions be ALL captions
   and /captions/giveusourdaily bet daily captions
          user posts would go to both? 
*/

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
	// res.json('posting to captions' + utils.postCaption(req.body))
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
///////////////GoDDAMN the FAVICON
//just appease the request
app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200);
});
