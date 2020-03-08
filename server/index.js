require('dotenv').config();
const { createTransporter, createMailOptions, send } = require('../lib/email/utils');
const { connectLD, LDFlagSubscription, LDVariationFlagTrigger } = require('./LaunchDarkly/utils');
const { user } = require('./LaunchDarkly/user');
const { decipherHMACSHA256HEX } = require('./crypto/utils');
const { httpsPOST } = require('./../lib/utils');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 8080;

/** LaunchDarkly */
const LaunchDarkly = require('launchdarkly-node-server-sdk');

const app = express();

/** Initializing LaunchDarkly + LD Event Listener */
const ldClient = connectLD(process.env.DEV_SDK);

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

/** LD WebHooks 
 * dev ngrok url - tunneling local hosting -  http://cbc60376.ngrok.io/int-ld-updates,  https://cbc60376.ngrok.io/int-ld-updates
*/
app.post('/int-ld-updates', (req, res) => {
  if (req.headers['x-ld-signature'] === decipherHMACSHA256HEX(req.body)) {
    if (req.body.titleVerb === 'turned off the flag') {
      const mockIncidentPayload = {
        "payload": {
          "summary": "Site-Under-Maintenance Flag has been triggered. Application is now offline to all users.",
          "timestamp": "2020-03-02T08:42:58.315+0000",
          "source": "http://127.0.0.1:8080",
          "severity": "critical",
          "component": "application",
          "group": "prod-datapipe",
          "class": "deploy",
          "custom_details": {
            "ping time": "1500ms",
            "load avg": 0.75
          }
        },
        "routing_key": process.env.PAGERDUTY_ROUTING_KEY,
        "dedup_key": "samplekeyhere",
        "images": [{
          "src": "https://www.pagerduty.com/wp-content/uploads/2016/05/pagerduty-logo-green.png",
          "href": "https://example.com/",
          "alt": "Example text"
        }],
        "links": [{
          "href": "https://example.com/",
          "text": "Link text"
        }],
        "event_action": "trigger",
        "client": "Sample Monitoring Service",
        "client_url": "https://monitoring.example.com"
      };

      httpsPOST('https://events.pagerduty.com/v2/enqueue', mockIncidentPayload);

      res.status(200);
    } else {
      res.status(200);
    }
  } else {
    res.status(401).send();
  }
});

app.listen(PORT, () => console.log(`dev-port ${PORT} is active.`));