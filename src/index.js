import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { user1 } from '../lib/userInfo';
import regeneratorRuntime from "regenerator-runtime";

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: user1.ClientSideId,
    user: user1.info,
    options: { 
      streaming: true,
    },
  });
  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById('app'),
  );
})();


