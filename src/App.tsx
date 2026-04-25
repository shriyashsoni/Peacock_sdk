import { Routes, Route } from 'react-router-dom';
import {
  HumanityConnect,
  useHumanity,
  useVerification,
  clearVerificationCache,
} from '@humanity-org/react-sdk';
import { useEffect } from 'react';

function IsHumanCheck() {
  const { verify, result, isLoading } = useVerification(); 
  useEffect(() => {  
    verify('is_human');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const isHuman = result?.value === true;

  return (
    <div className="status-card glass">
      {isLoading && (
        <div className="status-indicator">
          <div className="spinner"></div>
          <p className="status-checking">Verifying your human identity...</p>
        </div>
      )}
      {!isLoading && isHuman && (
        <div className="status-indicator">
          <div className="icon-success">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="status-verified">Biometric Identity Confirmed</p>
        </div>
      )}
      {!isLoading && !isHuman && (
        <div className="status-indicator">
          <div className="icon-error">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="status-unverified">Identity Verification Required</p>
        </div>
      )}
      {!isLoading && (
        <button
          className="btn-secondary"
          onClick={() => { clearVerificationCache(); verify('is_human'); }}
        >
          Re-verify Identity
        </button>
      )}
    </div>
  );
}

function Home() {
  const { isAuthenticated, isLoading } = useHumanity();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = 'https://pikock.vercel.app/';
    }
  }, [isAuthenticated]);

  if (isLoading || isAuthenticated) return (
    <div className="screen fade-in">
      <div className="spinner-lg"></div>
      <p className="loading-text">Connecting to Pikock...</p>
    </div>
  );

  return (
    <div className="screen fade-in">
      <div className="container">
        <img src="/peacockhill-logo.png" alt="Pikock Logo" className="logo bounce" />
        <h1 className="title gradient-text">Welcome to Pikock</h1>
        <p className="subtitle">Your gateway to secure, biometrically verified identity management. Experience the future of authentication.</p>
        <div className="connect-wrapper">
          <HumanityConnect
            mode="redirect"
            scopes={['openid', 'identity:read']}
            onError={(err) => console.error(err)}
          />
        </div>
      </div>
    </div>
  );
}

function Callback() {
  const { isAuthenticated, isLoading } = useHumanity();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.href = 'https://pikock.vercel.app/';
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="screen fade-in">
      <div className="spinner-lg"></div>
      <p className="loading-text">Authenticating with Pikock...</p>
    </div>
  );
}

export default function App() {
  return (
    <main className="app-layout">
      <div className="ambient-background">
        <div className="glow-circle top-left"></div>
        <div className="glow-circle bottom-right"></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </main>
  );
}
