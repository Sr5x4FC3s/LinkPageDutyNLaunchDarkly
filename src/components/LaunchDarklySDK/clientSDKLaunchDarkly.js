import React, {useState, useEffect} from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { PagerDutyRoutingKey } from '../../../lib/userInfo';
import { httpsPOST } from '../../../lib/utils';

/** PagerDuty Mock Payload to Trigger an Incident */
const PD_payload = {
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
  "routing_key": PagerDutyRoutingKey,
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

const ClientSDKLaunchDarkly = ({ SDK, ClientSideID }) => {
  const { devTestFlag, siteUnderMaintenance } = useFlags();

  const sendEmailAlert = () => {
    const payload = {
      status: 'critical',
    };

    httpsPOST('/emailAlertNotification', payload);
  };

  /** Triggered if site-under-maintenance or dev-test-flag evaluates to false */
  useEffect(() => {
    if (!siteUnderMaintenance) {      
      httpsPOST('https://events.pagerduty.com/v2/enqueue', PD_payload);
      sendEmailAlert();
    }

    if (!devTestFlag) {
      httpsPOST('https://events.pagerduty.com/v2/enqueue', PD_payload);
      sendEmailAlert();
    }
  }, [devTestFlag, siteUnderMaintenance]);

  return (
    <div id='client-sdk'>
      <h1>CLIENT</h1>
      <div>Dev Test Flag Status: {devTestFlag ? 'Flag on' : 'Flag off'}</div>
      <div>Site Under Maintenance Status: {siteUnderMaintenance ? 'Flag on' : 'Flag off'}</div>
      <button id='send-email-button' onClick={() => sendEmailAlert()}>Test Email Alert Notification</button>
    </div>
  )
};

export default ClientSDKLaunchDarkly;

