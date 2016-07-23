const schemas = require('./schemas.js');

module.exports = {
  addUser: function (reqBody, cb) {
    console.log('userReq',reqBody);
    const userPost = {
      first_name: reqBody.first_name,
      last_name: reqBody.last_name,
      email: reqBody.email,
      fb_username: reqBody.fb_username,
      fb_access: reqBody.fb_access,
      photo: reqBody.photo
    };
    //if there's already a user, don't create
    schemas.User.findOne({ where: {fb_username: reqBody.fb_username} }).then(function(user) {
    if (!user) {
      const newUser = schemas.User.build(userPost);
      newUser.save()
        .then(function(result){
          console.log('userPostsucceeded!!', result);
          cb({newUserId: result.dataValues.id});
        })
        .catch(function(err) {
          console.log(err);
        });
      } else {
        console.log('User already in database.');
        cb('User already in database.');
      }
    })
  },
  updateUserInfo: function (reqBody) {
    // const newUserInfo = {
    //   first_name: reqBody.first_name
    // }
  },
  getUserInfo: function (queryBody) {
    schemas.User.findOne({ where: {captionId: queryBody.captionId} })
      .then(function(User) {
        console.log(User)
        return User;
      })
      .catch(function(err) {
        console.error(err);
      })
  },
  authenticateUser: function() {
    schemas.User.findOne({ where: { userId }})
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
    const photoPost = {
      user_id: reqBody.user_id,
      url: reqBody.url,
      source: reqBody.source,
      hashtagId: reqBody.hashtagId,
      data: reqBody.data
    };

    //check if photo is duplicate
    schemas.Photo.findOne({ where: {url: reqBody.url} }).then(function(photo) {
      if (!photo) {
        const newPhoto = schemas.Photo.build(photoPost);
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
  postCaption: function (reqBody, cb) {
    //likes, dislikes
      // userId: reqBody.userId,
      // photoId: reqBody.photoId,
    const captionPost = {
      userId: reqBody.userId,
      caption_top: reqBody.caption_top,
      caption_bottom: reqBody.caption_bottom,
      font: reqBody.font
    };
    console.log('captionPost is', captionPost)
    // const newCap = 
    schemas.Caption.create(captionPost)
      .then(function(newPost){
        console.log('yusssss successs! new caption is ');
        cb(newPost);
      })
      .catch(function(err){
        console.log('Error in caption post: ', err);
        cb(err);
      });
  },
  upVoteCaption: function (captionId) {
    schemas.Caption.findOne({ where: {id: captionId} })
      .then(function (caption) {
        const oldVal = caption.likes;
        caption.update({
          likes: oldVal + 1
        });
        console.log('successfully upvoted!')
        return oldVal + 1;
      })
      .catch(function(err){
        console.log('Error upvoting caption: ', err);
      });
  }, 
  downVoteCaption: function (captionId) {
    schemas.Caption.findOne({ where: {id: captionId} })
      .then(function (caption) {
        const oldVal = caption.dislikes;
        caption.update({
          dislikes: oldVal + 1
        });
        console.log('successfully downvoted!')
        return oldVal + 1;
      })
      .catch(function(err){
        console.log('Error upvoting caption: ', err);
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
    schemas.Caption.findAll({})
      .then(function(results) {
        console.log('WE DID IT!!!!' + results)
        cb(results)
      })
      .catch(function(err) {
        cb(err)
      })
  }
};