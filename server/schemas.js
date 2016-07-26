const server = require('../server.js'); 
const Sequelize = require('sequelize');

///connect to heroku postgres server via its user & url
//add dialect options to enable connection
const sequelize = new Sequelize('postgres://qntzeozetttxxe:JDkRS8aTusHyPjDmp-YcWCK2qN@ec2-54-243-249-154.compute-1.amazonaws.com:5432/dfbtc6j4b2mtgi', {
	dialect: 'postgres',
	dialectOptions: {
		ssl: true
	}
});
////////////POSTGRES Tables/////////
///////////ORM: sequelize////////////


////// USER
//NOTE: w sequelize, if you don't set id, it will use primary key - id as default. 
const User = sequelize.define('user', {
		first_name: {
			type: Sequelize.STRING
		}, 
		last_name: {
			type: Sequelize.STRING
		},
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
		email: {
			type: Sequelize.STRING
		},
		fb_username: {
			type: Sequelize.STRING
		},
		fb_access: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false
	});


////// PHOTO
const Photo = sequelize.define('photo', {
		url: {
			type: Sequelize.STRING
		},
		source: {
			type: Sequelize.STRING
		}, 
		data: {
			type: Sequelize.STRING
		}
  });


////// CAPTION
const Caption = sequelize.define('caption', {
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
  	userId: {
  		type: Sequelize.STRING
  	}
  },
  	// photo_id: {
  	// 	type: Sequelize.STRING
  	// },
  	// font: {
  	// 	type: Sequelize.STRING
  	// }
  // },
  {
		timestamps: false
  });

// WE BEGAN BY DEFINING RELATIONSHIPS, BUT HAVE COMMENTED THEM OUT
// AS THESE ARE BEING DEFINED IN POSTICO AND WE APPEAR TO HAVE CONFLICTS 
// WHEN USING BOTH MODALITIES SIMULTANEOUSLY 

//read as:
   /*sequleize 'source' --- sequelize 'target'*/

// //DEFINE CAPTION RELATIONSHIPS 
// User.hasMany(Caption);
// Caption.belongsTo(User);
// // Caption.belongsTo(Photo);
// //DEFINE PHOTO RELATIONSHIPS 
// Photo.hasMany(Caption);
// Photo.hasMany(Hashtag);
/////test/ implement Photo.belongsTo(User) as an extension !!
sequelize.sync();


module.exports = {
	User: User,
	Photo: Photo,
	Caption: Caption,
	sequelize: sequelize
	// Hashtag: Hashtag -- not using hashtag for MVP
};