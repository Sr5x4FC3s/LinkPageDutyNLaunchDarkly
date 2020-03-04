import React from 'react';
import { httpsPOST } from '../../../lib/utils';
import { PagerDutyRoutingKey } from '../../../lib/userInfo';

/** Test Incident Payload to be sent */

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

const PDApiAccessTestComponent = () => {

  return (
    <div>
      <h1>PagerDuty</h1>
      <h3>Test Incident Reporting by Click the "Access PD API" Button Below.</h3>
      <button 
        id='page-duty-test-button' 
        onClick={() => httpsPOST('https://events.pagerduty.com/v2/enqueue', mockIncidentPayload)}
      >Access PD API</button>
    </div>
  )
};

export default PDApiAccessTestComponent;