import React, {useState, useEffect} from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { user1 } from '../../../userInfo';

const ClientSDKLaunchDarkly = ({ SDK, ClientSideID }) => {

  const { devTestFlag } = useFlags();
  const ldClient = useLDClient();

  const onLoginSuccessful = () => ldClient.identify({ key: 'dev-test-flag' });

  useEffect(() => {
    console.log(ldClient, onLoginSuccessful())
  }, [devTestFlag])

  return (
    <div id='client-sdk'>
      <h1>CLIENT</h1>
      <div>{devTestFlag ? 'Flag on' : 'Flag off'}</div>
    </div>
  )
};

export default ClientSDKLaunchDarkly;