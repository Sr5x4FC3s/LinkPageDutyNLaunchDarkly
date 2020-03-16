import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LDSDKToPDComponent from '../LaunchDarklySDK/ldSDKToPDComponent';
import SDKFeatureTestingComponent from '../LaunchDarklySDK/sdkFeatureTestingComponent';

const Router = () => {
  return (
    <Switch>
      <Route exact path='/ld_pd_comms' component={LDSDKToPDComponent}/>
      <Route path='/sdk_testing' component={SDKFeatureTestingComponent}/>
    </Switch>
  )
};

export default Router;