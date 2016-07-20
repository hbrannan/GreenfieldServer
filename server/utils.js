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
    console.log(schemas.Photo);
    schemas.Photo.findAll({}, function (results) {
      if (results) {
        return results;
      } else {
        console.log('Suxxx 4 U aint NO results, k?')
      }
    });
  },
  getDailyPhoto: function (user) {
    // function to update user info from a settings page ( or elsewhere? )
  },
  getPhotoCaptions: function  (photo) {
    // function to get all images/captions for the day
    // includes: caption text, image URL, vote count, user who posted ?
  },
  postCaption: function (caption) {
    // function to post a user-created caption
  },
  upVoteCaption: function (caption) {
    // function to upvote a particular caption
  }, 
  downVoteCaption: function (caption) {

  },
  displayVotes: function (caption) {

  }
};