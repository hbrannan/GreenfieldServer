const cron = require('cron').CronJob;
const db = require('./server/schemas.js');
const utils = require('./server/utils.js');
const fs = require('fs');

module.exports = new cron('0 0 0 * * *', function () {
    // var allPhotos = utils.getAllPhotos(); //{{}}
    // allPhotos = JSON.parse(allPhotos);
    // console.log(allPhotos);

    // var lowestId = id;
    //   //loop thru all 
    // for (var prop in allPhotos){
    //     //if current id is ONE greater than id && exists
    //     if (allPhotos[prop][id] > id){
    //         //RETURN OUT OF THE LOOP
    //         //set the id to a new id
    //     } else {
    //         //reset id to be the lowest id in the group
    //         if(allPhotos[prop][id] < id) {
    //             lowestId = allPhotos[prop][id];
    //         }
    //     }
    // }
});
