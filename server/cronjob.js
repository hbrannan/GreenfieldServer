const cron = require('cron').CronJob;
const db = require('./server/schemas.js');
const utils = require('./server/utils.js');
const fs = require('fs');

module.exports = new cron('0 0 0 * * *', function () {
    fs.readFile('./usedPhotosOfTheDay.txt', 'utf8', function(err, data){
        //split by new 
    })
    .then(function (lastId) {
        db.findAll({where: ['id > ?', lastId], order: 'id'})
    })
        //query db for all photos w/ id greater than last fsID
    .then (function (allUnusedPhotos){
            //if we get some back:   EG .length ? is not falsy?
        if (allUnusedPhotos) {
            //loop thru our results obj
            //map it into an array
            //sort the array
            //set the newPhotoOfTheDayId of the first id in the file
        } else {
            //if we don't, you ARE at the greatest ID. SO: 
            //set newPhotoOfTheDayId that is at the firstLine of usedPOD.txt
              //wipe fsfile clean
        }
    })
    .then(function (){
        fs.appendFile('./usedPhotosOfTheDay.txt', newPhotoOfTheDayId, function (){
            ///make sure to write with newLine
        });
      })

});
