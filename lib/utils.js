import axios from 'axios';

export const httpsPOST = (url, payload) => {
  axios.post(url, payload)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};