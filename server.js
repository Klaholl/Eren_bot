var CronJob = require('cron').CronJob;
var peu_importe = require('./upload_image');
new CronJob('0 0 13 * 10 *', peu_importe, null, true, 'America/Los_Angeles');