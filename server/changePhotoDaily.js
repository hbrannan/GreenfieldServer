// This page is commented out as we weren't able to successfully produce
// this stretch feature in time. 
// It is a daily-repeating function that updates the daily photo
//the daily photo should be in the DB

// var Promise = require('bluebird');
// const cron = require('cron').CronJob;
// const db = require('./schemas.js');
// const utils = require('./utils.js');
// const fs = require('fs');
// const oneDay = 86400000;

// const promisifiedRead = Promise.promisify(fs.readFile);

// var updateDailyPhoto = function () {
//     return promisifiedRead(__dirname + '/usedPhotosOfTheDay.txt', 'utf8')
//      .then(function (fileContents) {
//         //read the contents of the file
//         return fileContents.split('\n');
//      })
//      .then(function(arrayofContents){
//         //get the last el
//         return arrayofContents[arrayofContents.length-1];
//      })
//      .then(function(lastId){
//         //do a db fetch
//         //if exists, pass it on
//         //else, pass on the fIrST 
//         var nextHighest = db.Photo.findOne({
//             where:['id > ?', lastId],
//             order:[[db.sequelize.fn('min', db.sequelize.col('id'))]],
//             group: 'id'
//         });
//         if (nextHighest){
//             return nextHighest;
//         } else {
//             //return lowest id wrapped in an obj --HARDCODED
//     //         //if we don't, this IS at the greatest ID. SO: 
//     //         //set newPhotoOfTheDayId that is at the firstLine of usedPOD.txt
//     //           //wipe fsfile clean
//             return {id:1};
//         }
//      })
//      .then(function(nextHighestPhoto){
//         //grab the id out of returned obj
//         return nextHighestPhoto.id
//      })
//      .then(function(nextPhotoId){
//         //set the global var to this id
//         GLOBAL.dailyPhotoId = nextPhotoId;
//         //check the filepath
//         console.log(__dirname +'/usedPhotosOfTheDay.txt');
//         //AND ALSO APPEND the file
//         fs.appendFile(__dirname +'/usedPhotosOfTheDay.txt', GLOBAL.dailyPhotoId + '\n');
//      })
//      .catch(function(err){
//         console.log(err);
//      })
// };

// // 'utf8', function (err){
// //           if (err) {
// //             console.log('append process err', err);
// //           }
// //           console.log(GLOBAL.dailyPhotoId +' was appended to file!');
// //         }

// setInterval(updateDailyPhoto, oneDay);





