import { Routes, Route } from 'react-router-dom';
import {
  HumanityConnect,
  useHumanity,
} from '@humanity-org/react-sdk';
import { useEffect } from 'react';

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
