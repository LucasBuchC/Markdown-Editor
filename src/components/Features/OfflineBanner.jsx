import React, { useState, useEffect } from 'react';
import './OfflineBanner.css';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div className={`offline-banner ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <>
          <span>🟢 Você está online</span>
          <p>Sincronizando dados...</p>
        </>
      ) : (
        <>
          <span>🔴 Você está offline</span>
          <p>Editando localmente - Mudanças serão sincronizadas quando conectar</p>
        </>
      )}
    </div>
  );
};

export default OfflineBanner;
