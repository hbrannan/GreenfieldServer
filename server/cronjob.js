var cron = require('cron').CronJob;

module.exports = new cron('0 0 0 * * *', function () {
  console.log('hi')
});
