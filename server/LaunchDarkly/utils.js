require('dotenv').config();

const { httpsPOST } = require('../../lib/utils');

const LaunchDarkly = require('launchdarkly-node-server-sdk');

const connectLD = (sdk_key) => {
  return LaunchDarkly.init(sdk_key);
};

const LDAwaitInitialization = (ldConnection, callback) => {
  ldConnection.once('ready', () => {
    callback();
  });
};

const LDFlagSubscription = (ldConnection, type, user, callback) => {
  return ldConnection.on(`update:${type}`, (settings) => {
    callback();
  });
};

const LDVariationFlagTrigger = (ldConnection, featureKey, user, expectedFlagValue) => {
  return ldConnection.variation(featureKey, user, expectedFlagValue, (error, show_feature) => {
    if (show_feature) {
      return;
    } else {
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
      
      return;
    }
  });
};

const terminateConnection = (ldConnection) => {
  return ldConnection.close();
};

module.exports = {
  connectLD,
  LDAwaitInitialization,
  LDFlagSubscription,
  LDVariationFlagTrigger,
  terminateConnection,
};