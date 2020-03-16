import React, {useState, useEffect} from 'react';
import * as LDClient from 'launchdarkly-js-client-sdk';
import { user1 } from '../../../lib/userInfo';

/** Topics that are covered in this view */
const topicData = [
  'Bootstrapping', 
  'User Targeting', 
  'Anonymous Users', 
  'Segmentation', 
  'Distinguishing Between Private and Public Users', 
  'Implementation of Secure Mode', 
  'Click and Page View Tracking',
];

const SDKFeatureTestingComponent = () => {
  // const ldClient = LDClient;
  // test bootstrapping - local storage and server-side

  useEffect(() => {
    // Initialize before the component mounts
    // ldClient.initialize(user1.ClientSideId, user1.info, {bootstrap: ''});

    // End the connection after it has completely loaded all the bootstrapped features.
  }, []);

  return (
    <div>
      <h1>SDK Feature Testing:</h1> 
      {topicData.map(topic => (
        <ul id='testing-topic-list'>
          <li id={topic}><h4>{topic}</h4></li>
        </ul>
      ))}

    </div>
  )
};

export default SDKFeatureTestingComponent;