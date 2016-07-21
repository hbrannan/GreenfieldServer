var schemas = require('./schemas.js');

module.exports = {
  addUser: function (reqBody) {

  },
  updateUserInfo: function (user) {
    // function to update user info from a settings page ( or elsewhere? )
    console.log('this is an extnsion')
  },
  getUserInfo: function (user) {
    console.log('this is an extention')
  },
  getAllPhotos: function  () {
    schemas.Photo.findAll({})
      .then(function (results) {
        return results;
      })
      .catch(function (err) {
        console.log('Sweetie, youll get there, keep trying, k?', err);
      });
  },
  getDailyPhoto: function (cb) {
    // function to update user info from a settings page ( or elsewhere? )
    schemas.Photo.findOne({ where: { source: "imgur" }})
    .then(function(photo) {
       cb(photo.dataValues);
    }).catch( function(err) {
      console.log('uh oh!!!! there\'s an error: ', err);
      cb(err);
    })
  },
  getDailyPhotoId: function (photoDataVals) {
      return photoDataVals.id;
  },
  postPhoto: function (reqBody) {
    var photoPost = {
      user_id: reqBody.user_id,
      url: reqBody.url,
      source: reqBody.source,
      hashtagId: reqBody.hashtagId,
      data: reqBody.data
    };

    //check if photo is duplicate
    schemas.Photo.findOne({ where: {url: reqBody.url} }).then(function(photo) {
      if (!photo) {
        var newPhoto = schemas.Photo.build(photoPost);
        newPhoto.save()
          .then(function(){
            return newPhoto;
          })
          .catch(function(err){
            console.log('sweetie, srry, time to hustle AGAIN', err);
          });  
      } else {
        console.log('photo exists already')
        return 'Photo already in database';
      }
    })
  },
  getPhotoCaptions: function  (cb) {
    //get the daily photo
    //get the daily photoID
    console.log('doii', module.exports.getDailyPhoto(module.exports.getDailyPhotoId));
    //pass that ID as a where param 
    // schemas.Caption.findAll({ where: {photo_id= }});
    // includes: caption text, image URL, vote count, user who posted ?
  },
  postCaption: function (caption) {
        var user_id = postedUser.user_id;
    // function to post a user-created caption
  },
  upVoteCaption: function (caption) {
    // function to upvote a particular caption
        var user_id = postedUser.user_id;
  }, 
  downVoteCaption: function (caption) {
    var user_id = postedUser.user_id;
  },
  displayVotes: function (caption) {
    var user_id = postedUser.user_id;
  }
};