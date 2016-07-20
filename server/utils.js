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
  postPhoto: function (req) {
    console.log('weeeee! in postPhoto', req);
    // var photoPost = schemas.Photo.
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