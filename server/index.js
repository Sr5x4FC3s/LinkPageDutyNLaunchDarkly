require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 8080;

/** LaunchDarkly */

const LaunchDarkly = require('launchdarkly-node-server-sdk');

/* ************* */

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist')));

// app.use('/', (req, res, next) => {
//   const ldclient = LaunchDarkly.init('sdk-4fd0910a-deaf-45ec-a076-3d4e481b51d3');

//   ldclient.once('ready', function() {
//     ldclient.variation('your.flag.key', {key: 'user@test.com'}, false, function(err, showFeature) {
//       if (showFeature) {
//           // application code to show the feature
//       } else {
//           // the code to run if the feature is off

//       }
//     });
//   });
// });

/** used to send environment variable values to the client side */
app.get('/dev_keys', (req, res) => {
  res.send({
    SDK: process.env.DEV_SDK,
    clientSideID: process.env.DEV_CLIENT_SIDE_ID,
  })
});

/** serve index.html */
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => console.log(`dev-port ${PORT} is active.`));