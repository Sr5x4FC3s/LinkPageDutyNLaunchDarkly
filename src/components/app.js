import React from 'react';
import Toggle from './button/toggle';
import ClientSDKLaunchDarkly from './LaunchDarklySDK/clientSDKLaunchDarkly';
import ServerSDKLaunchDarkly from './LaunchDarklySDK/serverSDKLaunchDarkly';
import axios from 'axios';

import { withLDProvider, useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { user1 } from '../../lib/userInfo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleStatus: false,
      dev_sdk_key: '',
      dev_client_side_id: '',
    };

    this.changeToggleStatus = this.changeToggleStatus.bind(this);
  }

  componentDidMount() {
    /** fetch sdk keys from server */
    axios.get('/dev_keys')
      .then(res => {
        this.setState({
          dev_sdk_key: res.data.SDK,
          dev_client_side_id: res.data.clientSideID,
        });
      })
      .catch(err => console.log(err));

  };

  changeToggleStatus () {
    this.setState({
      toggleStatus: !this.state.toggleStatus
    });
  };

  render() {
    return (
      <div>
        <h1>Let's Connect LaunchDarkly with PagerDuty!</h1>
        {/* <Toggle 
          changeToggleStatus={this.changeToggleStatus}
          toggleStatus={this.state.toggleStatus}
        /> */}
        <ClientSDKLaunchDarkly 
          SDK={this.state.dev_sdk_key}
          ClientSideID={this.state.dev_client_side_id}
        />
        {/* {this.state.toggleStatus ?
          <ClientSDKLaunchDarkly 
            SDK={this.state.dev_sdk_key}
            ClientSideID={this.state.dev_client_side_id}
          />
          : 
          <ServerSDKLaunchDarkly 
            SDK={this.state.dev_sdk_key}
            ClientSideID={this.state.dev_client_side_id}
          />
        } */}
      </div>
    )
  }
};

export default withLDProvider({ 
  clientSideID: user1.ClientSideId,
  user: user1.info,
  options: { /* ... */ }
})(App);