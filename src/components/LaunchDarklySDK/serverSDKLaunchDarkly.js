import React, {useState} from 'react';
import { httpsPOST } from '../../../lib/utils';

const ServerSDKLaunchDarkly = () => {
  return (
    <div id='server-sdk'>
      <h1>Server</h1>
      <button 
        id='LD-sdk-button'
        onClick={() => httpsPOST('/serverSDKFlags', {})}
      >Test Server SDK Flag Retrieval</button>
    </div>
  )
};

export default ServerSDKLaunchDarkly;