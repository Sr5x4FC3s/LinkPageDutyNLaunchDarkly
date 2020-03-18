import React, {useState, useEffect} from 'react';
import ConfigureUserComponent from './testComponents/configureUserComponent';
import ConfigureBootstrapComponent from './testComponents/configureBootstrapComponent';
import SelectView from './testComponents/variationTests/selectView';
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
  // default userConfiguration
  const [userConfigs, setUserConfigs] = useState(null);

  // store flag key in local storage if it doesn't already exist 
  useEffect(() => {
    if (!localStorage.getItem('flagMap')) {
      localStorage.setItem(
        'flagMap', 
        JSON.stringify({'two-component-flag': 0}) // IMPORTANT: data being stored in browser cache memory must be converted to strings and parsed when retrieved
      ); 
    }
  }, []);

  // function to retrieve all the user configurations and make it available to the Bootstrap Component
  const retrieveUserConfiguration = (userConfiguration) => {
    if (userConfiguration) {
      setUserConfiguration(userConfiguration);
    }
    return userConfiguration;
  };

  return (
    <div>
      <h1>SDK Feature Testing:</h1> 
      {topicData.map(topic => (
        <ul id='testing-topic-list'>
          <li id={topic}><h4>{topic}</h4></li>
        </ul>
      ))}
      <SelectView />
      <ConfigureUserComponent 
        retrieveUserConfiguration={retrieveUserConfiguration}
      />
      <ConfigureBootstrapComponent 
        userOptions={!userConfigs ? userConfigs : user1.info}
      />
    </div>
  );
};

export default SDKFeatureTestingComponent;