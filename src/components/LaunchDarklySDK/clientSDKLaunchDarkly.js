import React, {useState, useEffect} from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { user1 } from '../../../lib/userInfo';

const ClientSDKLaunchDarkly = ({ SDK, ClientSideID }) => {
  const { devTestFlag, siteUnderMaintenance } = useFlags();
  const ldClient = useLDClient();

  const checkAtIntervals = () => {
    
  };

  const subscribeToFlagChanges = () => {
    
  };

  // useEffect(() => {
  //   let id = setInterval(() => {
  //     console.log(devTestFlag, siteUnderMaintenance);
  //   }, 3000);
  //   return () => clearInterval(id);
  // });


  useEffect(() => {
    subscribeToFlagChanges();
  }, [])

  return (
    <div id='client-sdk'>
      <h1>CLIENT</h1>
      <div>Dev Test Flag Status: {devTestFlag ? 'Flag on' : 'Flag off'}</div>
      <div>Site Under Maintenance Status: {siteUnderMaintenance ? 'Flag on' : 'Flag off'}</div>
    </div>
  )
};

export default ClientSDKLaunchDarkly;

