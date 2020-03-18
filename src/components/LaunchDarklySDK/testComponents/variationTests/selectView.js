import React, {useState, useEffect} from 'react';
import { initialize } from 'launchdarkly-js-client-sdk';
import GeneralDisplayComponent from './generalDisplayComponent';
import { user1 } from '../../../../../lib/userInfo';
import { generateSessionId } from '../../../../../lib/utils';

const SelectView = () => {
  const [userComponentStatus, setUserComponentStatus] = useState(0);
  const [segmentComponentStatus, setSegmentComponentStatus] = useState(0);
  const [currentUser, setCurrentUser] = useState('public');

  // options for form select field
  const users = ['public', 'admin', 'member'];

  // information for different components 
  const information = {
    component1: {
      name: 'Component 1 - Member View',
      description: 'A view that is accessible to the exclusive viewers.'
    },
    component2: {
      name: 'Component 2 - Admin View',
      description: 'A view that is not accessible to the general viewers and accessible by Admin\'s only'
    },
    not_visible: {
      name: 'Not Visible',
      description: 'No visible description'
    },
    public: {
      name: 'Public Component',
      description: 'No target users are set in this segment'
    },
    component3: {
      name: 'Component 1 - Member View',
      description: 'A view that is accessible to the exclusive viewers.'
    },
    component4: {
      name: 'Component 2 - Admin View',
      description: 'A view that is not accessible to the general viewers and accessible by Admin\'s only'
    }
  };

  useEffect(() => {
    console.log(segmentComponentStatus)
  }, [segmentComponentStatus])

  const retrieveFlagStatus = () => {
    // generate a Session ID for anonymous users 
    const sessionId = generateSessionId();

    const ldClient = initialize(user1.ClientSideId, user1.info, 'localStorage');

    let user;

    // identify feature flag privileges with a single user 
    const identity = (user) => {
      return new Promise(resolve => {
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
          console.log('result: ', result)
          setUserComponentStatus(result['two-component-flag']);
          setSegmentComponentStatus(result['three-component-flag']);
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
          console.log('result: ', result)
          setUserComponentStatus(result['two-component-flag']);
          setSegmentComponentStatus(result['three-component-flag']);
        })
        .catch(error => console.log(error));

    } else {
      user = user1.info;

      identity(user)
        .then(result => {
          console.log('result: ', result)
          setUserComponentStatus(result['two-component-flag']);
          setSegmentComponentStatus(result['three-component-flag']);
        })
        .catch(error => console.log(error));
    }

    return;
  };

  return (
    <div>
      <h1>Variation Testing:</h1>
      {userComponentStatus === 1 ? 
        <GeneralDisplayComponent 
          name={information.component1.name}
          description={information.component1.description}
        /> 
        : userComponentStatus === 2 ?
        <GeneralDisplayComponent 
          name={information.component2.name}
          description={information.component2.description}
        />
        :
        <GeneralDisplayComponent 
          name={information.not_visible.name}
          description={information.not_visible.description}
        />
      }
      <h1>Segment Testing:</h1>
      {segmentComponentStatus === 1 ? 
        <GeneralDisplayComponent 
          name={information.component3.name}
          description={information.component3.description}
        /> 
        : segmentComponentStatus === 2 ?
        <GeneralDisplayComponent 
          name={information.component4.name}
          description={information.component4.description}
        />
        :
        <GeneralDisplayComponent 
          name={information.public.name}
          description={information.public.description}
        />
      }
      <h3>Testing Users: Select a type of user and watch the view change as well</h3>
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