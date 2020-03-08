const crypto = require('crypto');

module.exports = {
  decipherHMACSHA256HEX : (payload) => {
    return crypto.createHmac('SHA256', process.env.LD_SITE_MAINTENANCE_WEBHOOK_SECRET_TOKEN).update(JSON.stringify(payload)).digest('hex');
  }
};