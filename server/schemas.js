var db = require('./server.js');
var Sequelize = require('sequelize');

///(why) do we need this? 
var sequelize = new Sequelize('postgres://qntzeozetttxxe:JDkRS8aTusHyPjDmp-YcWCK2qN@ec2-54-243-249-154.compute-1.amazonaws.com:5432/dfbtc6j4b2mtgi', {
	dialect: 'postgres',
	dialectOptions: {
		ssl: true
	}
});


////////////POSTGRES Tables/////////
///////////ORM sequelize////////////


////// USER
//NOTE: w sequelize, if you don't set id, it will use primary key - id as default. 
var User = sequelize.define('user', {
		first_name: {
			type: Sequelize.STRING

		}, 
		last_name: {
			type: Sequelize.STRING
		},
		login_or_password : {
			type: Sequelize.STRING

		},
		email: {
			type: Sequelize.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	});

///create/upate user table if does not already exists
// User.sync()
//   .catch(function(err) {
//   	console.error(err)
//   });

////// PHOTO
var Photo = sequelize.define('photo', {
	url: {
		type: Sequelize.STRING
	},
	source: {
		type: Sequelize.STRING
	}, 
	data: {
		type: Sequelize.STRING
	},
	createdAt: {
		type: DataTypes.DATE
	},
	updatedAt: {
		type: DataTypes.DATE
	}
});

//sync tabe w db if not exists
// Photo.sync()
//   .catch(function(err) {
//   	console.error(err)
//   });


////// CAPTION
var Caption = sequelize.define('caption', {
	likes: {
		type: Sequelize.INTEGER
	},
	dislikes: {
		type: Sequelize.INTEGER
	},
	caption_top: {
		type: Sequelize.STRING
	}, 
	caption_bottom: {
		type: Sequelize.STRING
	},
	createdAt: {
		type: DataTypes.DATE
	},
	updatedAt: {
		type: DataTypes.DATE
	}
});

//sync tabe w db if not exists
// Caption.sync()
//   .catch(function(err) {
//   	console.error(err)
//   });



////// HASHTAG
// var Hashtag = sequelize.define('hashtag', {
// 	hashtag: {
// 		type: Sequelize.STRING
// 	}
// });

//sync tabe w db if not exists
// Hashtag.sync()
//   .catch(function(err) {
//   	console.error(err)
//   });

//DEFINE HASHTAG RELATIONSHIPS 
// Hashtag.belongsToMany(Photo);
//DEFINE USER RELATIONSHIPS 
User.hasMany(Caption);
//DEFINE CAPTION RELATIONSHIPS 
Caption.belongsTo(User);
Caption.belongsTo(Photo);
//DEFINE PHOTO RELATIONSHIPS 
Photo.hasMany(Caption);
// Photo.hasMany(Hashtag);
/////may want Photo to belong to user as an extension !!
sequelize.sync();

console.log(sequelize.models);

module.exports = {
	User: User,
	Photo: Photo,
	Caption: Caption
	// Hashtag: Hashtag
};