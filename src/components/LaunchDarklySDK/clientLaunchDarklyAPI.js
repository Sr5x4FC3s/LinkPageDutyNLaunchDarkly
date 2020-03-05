import React from 'react';
import { httpsGET, httpsPOST } from '../../../lib/utils';
import { project_keys, environment_keys, flag_keys, api_key } from '../../../lib/api/projectKeys';

const ClientLDAPIComponent = () => {

  const retrieveFlagStatus = () => {
    let options = {
      headers: {
        'ld-api-version': 'beta',
        authorization: api_key,
      },
    };

    httpsGET(`https://app.launchdarkly.com/api/v2/flag-statuses/${project_keys}/${environment_keys}/${flag_keys}`, options);
  };
  
  return (
    <div>
      <h1>API TEST COMPONENT</h1>
      <h3>Due to this being hosted on a development server, webhooks are difficult to test</h3>
      <button 
        id='test-api-button'
        onClick={() => retrieveFlagStatus()}
      >Get Flag Status - LD API</button>
    </div>
  )
};

export default ClientLDAPIComponent;