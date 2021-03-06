const schemas = require('./schemas.js');
//remove cronJob for now
// const cronjob = require('./cronjob.js');
GLOBAL.dailyPhotoId = 1;

/*
This file, and server.js have remnants of transitioning from hardcoded daily photo to 
referencing dailyPhoto ID as a global variable. 

This is realted to changeDailyPhoto.js which is almost-complete functionality for this extension
*/

module.exports = {
  addUser: function (reqBody, cb) {
    const userPost = {
      first_name: reqBody.first_name,
      last_name: reqBody.last_name,
      email: reqBody.email,
      fb_username: reqBody.fb_username,
      fb_access: reqBody.fb_access,
      photo: reqBody.photo
    };
    //if there's already a user, don't create
    schemas.User.findOne({ where: {fb_username: reqBody.fb_username} })
      .then(function(user){
        if (!user) {
          const newUser = schemas.User.build(userPost);
          newUser.save()
          .then(function(newUser) {
            console.log(newUser);
            cb({newUserId: newUser.dataValues.id});
          })
        } else {
          console.log('User already in database: ' + user.id);
          cb({newUserId: user.id});
        }
      })
      .catch(function(err){
        console.log("Error adding user", reqBody.fb_username, err);
        cb("Error adding user", reqBody.fb_username, err);
      });
  },
  getUserInfo: function (userId, cb) {
    schemas.User.findOne({ where: {id: userId} })
      .then(function(User) {
        console.log(User)
        cb(User);
      })
      .catch(function(err) {
        console.error(err);
        cb(err)
      })
  },
  authenticateUser: function (user) {
    schemas.User.findOne({ where: { userId: user.id }})
  },
  getAllPhotos: function (cb) {
    schemas.Photo.findAll({})
      .then(function (results) {
        cb(results);
      })
      .catch(function (err) {
        cb('Error getting all photos!', err)
      });
  },
  getDailyPhoto: function (cb) {
    schemas.Photo.findOne({ where: { id: GLOBAL.dailyPhotoId }})
    .then(function(photo) {
       cb(photo.dataValues);
    }).catch( function(err) {
      console.log('Error retrieving daily photo: ', err);
      cb(err);
    });
  },
  postPhoto: function (reqBody, cb) {

    const photoPost = {
      userId: reqBody.user_id,
      photoId: GLOBAL.dailyPhotoId,
      url: reqBody.url,
      source: reqBody.source,
      hashtagId: reqBody.hashtagId,
      data: reqBody.data
    };

    //check if photo is duplicate
    schemas.Photo.findOne({ where: {url: reqBody.url} })
      .then(function(photo) {
        if (!photo) {
          const newPhoto = schemas.Photo.build(photoPost);
          newPhoto.save()
            .then(function(newPhoto){
              cb(newPhoto);
            })
            .catch(function(err){
              console.log('Error posting photo: ', err);
            });  
        } else {
          console.log('photo exists already');
          cb('Photo already in database.');
        }
      })
      .catch(function(err) {
        console.log('error adding photo: ', err)
        cb('error adding photo: ', err)
      })
  },
  getPhotoCaptions: function  (photoId, cb) {
    console.log(GLOBAL.dailyPhotoId);
    schemas.Caption.findAll({ 
      where: {photoId: GLOBAL.dailyPhotoId}, 
      attributes:['caption_top', 'caption_bottom', 'likes', 'dislikes', 'font', 'id', 'photoId', 'userId']
    })
      .then(function (captions) {
        cb(captions);
      })
      .catch(function(err){
        console.log('Error retrieving daily captions: ', err);
        cb(err);
      });
  },
  postDailyCaption: function (photoId, reqBody, cb) {
    console.log('charliez req body', reqBody);
    const captionPost = {
      photoId: GLOBAL.dailyPhotoId,
      userId: reqBody.userId,
      caption_top: reqBody.caption_top,
      caption_bottom: reqBody.caption_bottom,
      font: reqBody.font
    };
    console.log('captionPost is', captionPost)
    // const newCap = 
    schemas.Caption.create(captionPost)
      .then(function(newPost){
        console.log('yusssss successs! new caption is ', newPost);
        cb(newPost);
      })
      .catch(function(err){
        console.log('Error in caption post: ', err);
        cb(err);
      });
  },
  upVoteCaption: function (captionId, cb) {
    schemas.Caption.findOne({ where: {id: captionId} })
      .then(function (caption) {
        const oldVal = caption.likes;
        caption.update({
          likes: oldVal + 1
        });
        console.log('successfully upvoted!')
        cb(oldVal + 1);
      })
      .catch(function(err){
        console.log('Error upvoting caption: ', err);
        cb(err)
      });
  }, 
  downVoteCaption: function (captionId, cb) {
    schemas.Caption.findOne({ where: {id: captionId} })
      .then(function (caption) {
        const oldVal = caption.dislikes;
        caption.update({
          dislikes: oldVal + 1
        });
        console.log('successfully downvoted!')
        cb(oldVal + 1);
      })
      .catch(function(err){
        console.log('Error upvoting caption: ', err);
        cb(err)
      });
  },
  // returns the likes, dislikes, and total votes of a caption
  displayCaptionVotes: function (captionId, callback) {
    //find likes
    schemas.Caption.findOne({ where: { id: captionId } })
      .then(function (caption) {
        const captionVotes = {
          likes: caption.likes,
          dislikes: caption.dislikes,
          total: caption.likes + caption.dislikes
         }
         console.log(captionVotes);
        callback(captionVotes);
      })
      .catch(function(err) {
        console.log('Error getting caption votes: ', err);
      })
  },
  getAllCaptions: function(cb) {
    schemas.Caption.findAll({
        attributes:['caption_top', 'caption_bottom', 'likes', 'dislikes', 'font', 'id', 'photoId', 'userId']
    })
      .then(function(results) {
        console.log('WE DID IT!!!!' + results)
        cb(results)
      })
      .catch(function(err) {
        cb(err)
      })
  }
};