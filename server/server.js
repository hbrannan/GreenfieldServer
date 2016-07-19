///LIST DEPENDENCIES
var express = require('express');
// var Sequelize = require('sequelize');
// var pg = require('pg');

////SET VARIABLES
var port = 3000;

////CONNECT TO SERVER
var app = express();
app.listen(process.env.PORT || port, function () {
	console.log('Server listening at ' + port);
});


app.use(express.static(__dirname + '/../dummy.html'));

app.get('/', function (req, res) {
	res.send('Heyyy bitchez');
});

app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200);
});
