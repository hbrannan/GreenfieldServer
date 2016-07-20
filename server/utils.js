var schemas = require('./schemas.js');

module.exports = {
  addUser: function (user) {
    
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
  getDailyPhoto: function (user) {
    // function to update user info from a settings page ( or elsewhere? )
  },
  postPhoto: function (reqHeaders) {
    var photoPost = {
      user_id: reqHeaders.user_id,
      url: reqHeaders.url,
      source: reqHeaders.source,
      hashtagId: reqHeaders.hashtagId,
      data: reqHeaders.data
    };
    var newPhoto = schemas.Photo.build(photoPost);
    newPhoto.save()
      .then(function(){
        console.log('posted new photo: ', newPhoto);
        return newPhoto;
      })
      .catch(function(err){
        console.log('sweetie, srry, time to hustle AGAIN', err);
      });
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