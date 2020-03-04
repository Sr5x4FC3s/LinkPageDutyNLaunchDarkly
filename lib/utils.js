const axios = require('axios');

const httpsPOST = (url, payload) => {
  axios.post(url, payload)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};

module.exports = {
  httpsPOST
};