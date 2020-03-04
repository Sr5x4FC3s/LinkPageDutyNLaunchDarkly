import React, {useState} from 'react';
import { httpsPOST } from '../../../lib/utils';

const ServerSDKLaunchDarkly = () => {
  return (
    <div id='server-sdk'>
      <h1>Server</h1>
      <h3>Update: [3/3/2020]: Node Server Automatically Detects Changes LaunchDarkly Site-Under-Maintenance Feature Changes And Sends Updates To PagerDuty Manager On Duty.</h3>
      <button 
        id='LD-sdk-button'
        onClick={() => httpsPOST('/serverSDKFlags', {})}
      >Test Server SDK Flag Retrieval</button>
    </div>
  )
};

export default ServerSDKLaunchDarkly;