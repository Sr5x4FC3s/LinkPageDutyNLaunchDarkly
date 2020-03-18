const axios = require('axios');
const crypto = require('crypto');

const httpsPOST = (url, payload) => {
  axios.post(url, payload)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};

const httpsGET = (url, headerOptions) => {
  if (headerOptions) {
    return axios.get(url, headerOptions)
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
  } else {
    return axios.get(url)
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));
  }
};

const generateSessionId = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = {
  httpsPOST,
  httpsGET,
  generateSessionId,
};