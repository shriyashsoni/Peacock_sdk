import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HumanityProvider } from '@humanity-org/react-sdk';
import '@humanity-org/react-sdk/styles.css';
import './index.css';
import App from './App';

const clientId = import.meta.env.VITE_HUMANITY_CLIENT_ID;
const environment = import.meta.env.VITE_HUMANITY_ENVIRONMENT || 'sandbox';
const redirectUri = import.meta.env.VITE_REDIRECT_URI || window.location.origin + '/callback';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HumanityProvider
        clientId={clientId}
        redirectUri={redirectUri}
        environment={environment as 'production' | 'sandbox'}
        storage="sessionStorage"
        onError={(error) => console.error('[Humanity]', error)}
      >
        <App />
      </HumanityProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
