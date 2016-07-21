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
  getDailyPhoto: function () {
    // function to update user info from a settings page ( or elsewhere? )
    schemas.Photo.findOne({ where: { source: "imgur" }}).then(function(photo) {
      console.log('whats photo nE way?', photo);
      return photo;
    }).catch( function(err) {
      console.log('uh oh!!!! there\'s an error: ', err);
    })
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
        console.log('no photo like that in our db, posting...')
        var newPhoto = schemas.Photo.build(photoPost);
        newPhoto.save()
          .then(function(){
            console.log('posted new photo: ', newPhoto);
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
  getPhotoCaptions: function  (photo) {
    console.log('hi');
    // function to get all images/captions for the day
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