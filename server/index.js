require('dotenv').config();
const { createTransporter, createMailOptions, send } = require('../lib/email/utils');
const { connectLD, LDFlagSubscription, LDVariationFlagTrigger } = require('./LaunchDarkly/utils');
const { user } = require('./LaunchDarkly/user');

// const ngrok = require('ngrok');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 8080;

/** LaunchDarkly */
const LaunchDarkly = require('launchdarkly-node-server-sdk');

const app = express();

/** Initializing Ngrok Tunneling */
// const Ngrok = async () => {
//   console.log('triggered')
//   let connection =  await ngrok.connect({
//     // proto: 'http', // http|tcp|tls, defaults to http
//     // addr: 8080, // port or network address, defaults to 80
//     // auth: 'user:pwd', // http basic authentication for tunnel
//     // subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
//     authtoken: process.env.NGROK_AUTH_TOKEN, // your authtoken from ngrok.com
//     // region: 'us', // one of ngrok regions (us, eu, au, ap), defaults to us
//     // configPath: '~/git/project/ngrok.yml', // custom path for ngrok config file
//     // binPath: default => default.replace('app.asar', 'app.asar.unpacked'), // custom binary path, eg for prod in electron
//     // onStatusChange: status => {}, // 'closed' - connection is lost, 'connected' - reconnected
//     // onLogEvent: data => {}, // returns stdout messages from ngrok process
//   });
//   return connection;
// };


/** Initializing LaunchDarkly + LD Event Listener */
const ldClient = connectLD(process.env.DEV_SDK);

// LDFlagSubscription(ldClient, 'site-under-maintenance', user, () => LDVariationFlagTrigger(ldClient, 'site-under-maintenance', user, true));

/**************************/

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

/** middleware for handling LD Site Maintenance Flag Status */
app.use('/', (req, res, next) => {
  LDFlagSubscription(ldClient, 'site-under-maintenance', user, () => LDVariationFlagTrigger(ldClient, 'site-under-maintenance', user, true));
  next();
});

app.use('/', express.static(path.join(__dirname, '../dist')));

/** used to send environment variable values to the client side */
app.get('/dev_keys', (req, res) => {
  res.status(200).send({
    SDK: process.env.DEV_SDK,
    clientSideID: process.env.DEV_CLIENT_SIDE_ID,
  })
});

/** serve index.html */
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

/** send email alerts to PagerDuty email to trigger an event */
app.post('/emailAlertNotification', (req, res) => {
  // let transporter = createTransporter(process.env.EMAIL_SERVICE_PROVIDER, process.env.EMAIL_USER, process.env.EMAIL_PW, process.env.GOOGLE_OAUTH2_CLIENT_ID, process.env.GOOGLE_OAUTH2_SECRET);
  // let options = createMailOptions(process.env.EMAIL_USER, process.env.PAGERDUTY_EMAIL_KEY, 'Site_Under_Maintenance Flag has been triggered - Incident StatusL: Critical', `${Object.keys(req.body)}: ${Object.values(req.body)}`);
  // send(transporter, options);

  let transporter = createTransporter(process.env.EMAIL_SERVICE_PROVIDER2, process.env.EMAIL_USER2, process.env.EMAIL_YAHOO_APP_PW);
  let options = createMailOptions(process.env.EMAIL_USER2, process.env.PAGERDUTY_EMAIL_KEY, 'Site_Under_Maintenance Flag has been triggered - Incident StatusL: Critical', `${Object.keys(req.body)}: ${Object.values(req.body)}`);

  let sendEmail = new Promise(resolve => {
    resolve(send(transporter, options));
  });

  sendEmail
    .then(result => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(400).send();
    })
});

app.listen(PORT, () => console.log(`dev-port ${PORT} is active.`));