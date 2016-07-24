const cron = require('cron').CronJob;
const db = require('./schemas.js');
const utils = require('./utils.js');
const fs = require('fs');

module.exports = new cron('10 0 0 * * *', function () {
    fs.readFile('./usedPhotosOfTheDay.txt', 'utf8', function(err, data){
        return data.toString().split('\n');
        //this should return an array of lines
    })
    .then(function(linesArray){
        //get last one
        return linesArray[linesArray.length-1];
    })
    // .then(function (lastId) {
        //expect that to be only a number. Is it a string? 
        //console.log(lastId)
        //convert lastId to number? 
    //     db.findAll({where: ['id > ?', lastId], order: 'id'})
    // })
    //     //query db for all photos w/ id greater than last fsID
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
    .then(function (newPhotoOfTheDayId){
        fs.appendFile('./usedPhotosOfTheDay.txt', newPhotoOfTheDayId, function (err){
          if (err) {
            throw err;
        }
          console.log('The "data to append" was appended to file!');
        });
    });

}, null, false);

module.exports = new cron('* 0 0 * * *', console.log('see this every 10 seconds'), null, true);
