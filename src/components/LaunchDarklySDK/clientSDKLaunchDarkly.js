import React, {useState, useEffect} from 'react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { user1 } from '../../../lib/userInfo';
import { httpsPOST } from '../../../lib/utils';

const ClientSDKLaunchDarkly = ({ SDK, ClientSideID }) => {
  const { devTestFlag, siteUnderMaintenance } = useFlags();
  const ldClient = useLDClient();

  const sendEmailAlert = () => {
    const payload = {
      status: 'critical',
    };

    httpsPOST('/emailAlertNotification', payload);
  };

  const subscribeToFlagChanges = () => {
  };

  // useEffect(() => {
  //   let id = setInterval(() => {
  //     console.log(devTestFlag, siteUnderMaintenance);
  //     // subscribeToFlagChanges();
  //   }, 3000);
  //   return () => clearInterval(id);
  // });

  return (
    <div id='client-sdk'>
      <h1>CLIENT</h1>
      <div>Dev Test Flag Status: {devTestFlag ? 'Flag on' : 'Flag off'}</div>
      <div>Site Under Maintenance Status: {siteUnderMaintenance ? 'Flag on' : 'Flag off'}</div>
      <button id='send-email-button' onClick={() => sendEmailAlert()}>Test Email Alert Notification</button>
    </div>
  )
};

export default ClientSDKLaunchDarkly;

