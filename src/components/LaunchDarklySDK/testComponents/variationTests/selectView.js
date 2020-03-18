import React, {useState, useEffect} from 'react';
import { initialize } from 'launchdarkly-js-client-sdk';
import GeneralDisplayComponent from './generalDisplayComponent';
import { user1 } from '../../../../../lib/userInfo';
import { generateSessionId } from '../../../../../lib/utils';

const SelectView = () => {
  const [componentStatus, setComponentStatus] = useState(0);
  const [currentUser, setCurrentUser] = useState('public');

  // options for form select field
  const users = ['public', 'admin', 'member'];

  // information for different components 
  const information = {
    component1: {
      name: 'Component 1 - Public View',
      description: 'A view that is accessable to the general viewers.'
    },
    component2: {
      name: 'Component 2 - Admin View',
      description: 'A view that is notaccessable to the general viewers and accessable by Admin\'s only'
    },
    not_visible: {
      name: 'Not Visible',
      description: 'No visible description'
    }
  };

  const retrieveFlagStatus = () => {
    // generate a Session ID for anonymous users 
    const sessionId = generateSessionId();

    const ldClient = initialize(user1.ClientSideId, user1.info, 'localStorage');
    let user;

    const identity = (user) => {
      return new Promise (resolve => {
        resolve(ldClient.identify(user))
      });
    };

    if (currentUser === 'public') {
      user = {
        key: sessionId, 
        anonymous: true, 
      };

      identity(user)
        .then(result => {
          setComponentStatus(result['two-component-flag']);
        })
        .catch(error => console.log(error));

    } else if (currentUser === 'member') {
      user = {
        key: 'member',
        name: 'a name',
        email: 'somemember@gmail.com'
      };

      identity(user)
        .then(result => {
          setComponentStatus(result['two-component-flag']);
        })
        .catch(error => console.log(error));

    } else {
      user = user1.info;

      identity(user)
        .then(result => {
          setComponentStatus(result['two-component-flag']);
        })
        .catch(error => console.log(error));
    }

    return;
  };

  return (
    <div>
      <h1>Variation Testing:</h1>
      {componentStatus === 1 ? 
        <GeneralDisplayComponent 
          name={information.component1.name}
          description={information.component1.description}
        /> 
        : componentStatus === 2 ?
        <GeneralDisplayComponent 
          name={information.component2.name}
          description={information.component2.description}
        />
        :
        <GeneralDisplayComponent 
          name={information.not_visible.name}
          decription={information.not_visible.description}
        />
      }
      <form>
        <select onChange={e => setCurrentUser(e.target.value)}>
          {
            users.map(user => (
              <option value={user}>{user}</option>
            ))
          }
        </select>
      </form>
      <button onClick={() => retrieveFlagStatus()}>submit</button>
    </div>
  )
};

export default SelectView;