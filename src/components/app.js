import React from 'react';
import Toggle from './button/toggle';
import ClientSDKLaunchDarkly from './LaunchDarklySDK/clientSDKLaunchDarkly';
import ServerSDKLaunchDarkly from './LaunchDarklySDK/serverSDKLaunchDarkly';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleStatus: false,
    }
    this.changeToggleStatus = this.changeToggleStatus.bind(this);
  }

  changeToggleStatus () {
    this.setState({
      toggleStatus: !this.state.toggleStatus
    });
  };

  render() {
    return (
      <div>
        <h1>Let's Connect LaunchDarkly with PagerDuty!</h1>
        <Toggle 
          changeToggleStatus={this.changeToggleStatus}
          toggleStatus={this.state.toggleStatus}
        />
        {this.state.toggleStatus ?
          <ClientSDKLaunchDarkly />
          : 
          <ServerSDKLaunchDarkly />
        }
      </div>
    )
  }
};