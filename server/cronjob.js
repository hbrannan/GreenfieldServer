var Promise = require('bluebird');
const cron = require('cron').CronJob;
const db = require('./schemas.js');
const utils = require('./utils.js');
const fs = require('fs');
const oneDay = 86400000;

const promisifiedRead = Promise.promisify(fs.readFile);

var updateDailyPhoto = function () {
    return promisifiedRead(__dirname + '/usedPhotosOfTheDay.txt', 'utf8')
     .then(function (fileContents) {
        //read the contents of the file
        return fileContents.split('\n');
     })
     .then(function(arrayofContents){
        //get the last el
        return arrayofContents[arrayofContents.length-1];
     })
     .then(function(lastId){
        //do a db fetch
        console.log('dem boyz sux, amiright', db.Photo.findAll({where: {id: lastId}}));
     })
     .catch(function(err){
        console.log(err);
     })
};

setInterval(updateDailyPhoto, 30000);

    // .then(function (lastId) {
    //     //expect that to be only a number. Is it a string? 
    //     console.log(lastId)
    //    // convert lastId to number? 
    //     db.findAll({where: ['id > ?', lastId], order: 'id'})
    // })
        //query db for all photos w/ id greater than last fsID
    // .then (function (allUnusedPhotos){
    //         //if we get some back:   EG .length ? is not falsy?
    //     if (allUnusedPhotos) {
    //         //loop thru our results obj
    //         //map it into an array
    //         //sort the array
    //         //set the newPhotoOfTheDayId of the first id in the file
    //     } else {
    //         //if we don't, you ARE at the greatest ID. SO: 
    //         //set newPhotoOfTheDayId that is at the firstLine of usedPOD.txt
    //           //wipe fsfile clean
    //     }
    // })

    // .then(function (newPhotoOfTheDayId){
    //     fs.appendFile('./usedPhotosOfTheDay.txt', newPhotoOfTheDayId, function (err){
    //       if (err) {
    //         throw err;
    //       }
    //       console.log('The "data to append" was appended to file!');
    //     });
    // });


// module.exports = new cron('10 * * * * *', fs.appendFile('./usedPhotosOfTheDay.txt', 'see this every 10 seconds', function (err){
//     console.log(err);
// });
