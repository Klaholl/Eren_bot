const CronJob = require('cron').CronJob;
const upload_image = require('./upload_image');

new CronJob('0 0 12 * 10 *', upload_image);