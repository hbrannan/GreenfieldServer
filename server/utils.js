var schemas = require('./schemas.js');

module.exports = {
  addUser: function (reqBody) {

  },
  updateUserInfo: function (user) {

  },
  getUserInfo: function (user) {

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
    //currently: placeholder photo!! 
    schemas.Photo.findOne({ where: { source: "imgur" }})
    .then(function(photo) {
       cb(photo.dataValues);
    }).catch( function(err) {
      console.log('Error retrieving daily photo: ', err);
      cb(err);
    });
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
          .then(function(newPhoto){
            return newPhoto;
          })
          .catch(function(err){
            console.log('Error posting photo: ', err);
          });  
      } else {
        console.log('photo exists already')
        return 'Photo already in database.';
      }
    })
  },
  getPhotoCaptions: function  (photoId, cb) {
    /*do this with pure sql: 
SELECT id, likes, dislikes, caption_top, caption_bottom, user_id, photo_id 
FROM captions AS caption WHERE caption.photo_id = 1;
    */
    schemas.Caption.findAll({ where: {photoId: photoId}})
      .then(function (captions) {
        cb(captions);
      })
      .catch(function(err){
        console.log('Error retrieving daily captions: ', err);
        cb(err);
      });
  },
  postCaption: function (reqBody) {
    // console.log(reqBody);
    // var captionPost = {
    //   id: reqBody.id,
    //   user_id: reqBody.user_id,
    //   photo_id: reqBody.photo_id,
    //   caption_top: reqBody.caption_top,
    //   caption_bottom: reqBody.caption_bottom,
    //   likes: reqBody.likes,
    //   dislikes: reqBody.dislikes,
    //   font: reqBody.font
    // };
    // var newCaption = schemas.Caption.build(captionPost);
    // newCaption.save()
    //   .then(function(newCaption){
    //     return newCaption
    //   })
    //   .catch(function(err){
    //     console.log('Error in caption post: ', err);
    //   })
  },
  upVoteCaption: function (captionId) {
    // schemas.Caption.findOne({ where: {id: captionId} })
    //   .then(function () {
    //     //reset/ overwrite that Caption's likes to likes++
    //   })
    //   .catch(function(err){
    //     console.log('Error upvoting caption: ', err);
    //   });
  }, 
  downVoteCaption: function (captionId) {
    // schemas.Caption.findOne({ where: {id: captionId} })
    //   .then(function () {
    //     //reset/ overwrite that Caption's dislikes to dislikes++
    //   })
    //   .catch(function(err){
    //     console.log('Error upvoting caption: ', err);
    //   });
  },
  displayCaptionVotes: function (captionId) {
    //find likes
    //find dislikes
    //add them together and return that number.
  }
};