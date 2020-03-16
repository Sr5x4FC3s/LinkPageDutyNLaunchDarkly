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
  const ldClient = LDClient;

  const [ipAddress, setIpAddress] = useState('');
  const [key, setKey] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  // test bootstrapping - local storage and server-side

  useEffect(() => {
    // Initialize before the component mounts
    ldClient.initialize(user1.ClientSideId, user1.info, {bootstrap: ''});

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
      <h2>Configure User Data and Options</h2>
      <div>Anonymous (On/Off)</div>
      {!anonymous ? 
        <div style={{width: '100px', height: '50px', backgroundColor: 'red'}}>Anonymous Indicator: {anonymous}</div>
        : 
        <div style={{width: '100px', height: '50px', backgroundColor: 'green'}}>Anonymous Indicator: {anonymous}</div>
      }
      <button               
        onClick={() => setAnonymous(!anonymous)}
      >Toggle
      </button>
      <form>
        <label>
          IP Address
          <input 
            type='text'
            onChange={e => setIpAddress(e.target.value)}
            placeholder='IP Address'
          />
        </label>
        <label>
          Key
          <input 
            type='text'
            onChange={e => setKey(e.target.value)}
            placeholder='Key'
          />
        </label>
        <label>
          First Name
          <input 
            type='text'
            onChange={e => setFirstName(e.target.value)}
            placeholder='First Name'
          />
        </label>
        <label>
          Last Name
          <input 
            type='text'
            onChange={e => setLastName(e.target.value)}
            placeholder='Last Name'
          />
        </label>
        <label>
          Email
          <input 
            type='text'
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
          />
        </label>
        <label>
          Country
          <input 
            type='text'
            onChange={e => setCountry(e.target.value)}
            placeholder='Country'
          />
        </label>
        <label>
          Anonymous
          <button               
            onClick={() => setAnonymous(!anonymous)}
          >Toggle
          </button>
        </label>
        <input 
          type='submit'
          value='submit'
        />
      </form>
    </div>
  )
};

export default SDKFeatureTestingComponent;