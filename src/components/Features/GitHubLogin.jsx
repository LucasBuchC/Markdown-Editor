import React, { useState } from 'react';
import { isGitHubAuthenticated, getGitHubUser, logoutGitHub, setGitHubToken } from '../../utils/githubAPI';
import './GitHubLogin.css';

const GitHubLogin = ({ onStatusChange }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isGitHubAuthenticated());
  const [user, setUser] = useState(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!token.trim()) {
      alert('Por favor, insira um token válido');
      return;
    }

    setLoading(true);
    try {
      // Testar o token
      setGitHubToken(token);
      
      const userData = await getGitHubUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        setShowTokenInput(false);
        setToken('');
        onStatusChange?.(true, userData);
      } else {
        alert('Token inválido ou expirado');
        setGitHubToken(null);
      }
    } catch (error) {
      alert('Erro ao autenticar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutGitHub();
    setIsAuthenticated(false);
    setUser(null);
    setToken('');
    setShowTokenInput(false);
    onStatusChange?.(false, null);
  };

  React.useEffect(() => {
    const checkAuth = async () => {
      if (isGitHubAuthenticated()) {
        const userData = await getGitHubUser();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          onStatusChange?.(true, userData);
        }
      }
    };

    checkAuth();
  }, [onStatusChange]);

  if (isAuthenticated && user) {
    return (
      <div className="github-login authenticated">
        <div className="github-user-info">
          <img src={user.avatar_url} alt={user.login} className="github-avatar" />
          <div className="github-user-details">
            <span className="github-username">@{user.login}</span>
            <span className="github-status">Conectado ao GitHub</span>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <div className="github-login">
      {!showTokenInput ? (
        <button 
          className="btn-login-github"
          onClick={() => setShowTokenInput(true)}
        >
          🔗 Conectar com GitHub
        </button>
      ) : (
        <div className="github-token-input">
          <input
            type="password"
            placeholder="Cole seu Personal Access Token do GitHub"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            className="token-input"
          />
          <div className="token-buttons">
            <button 
              className="btn-token-submit" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '⏳ Autenticando...' : '✓ Conectar'}
            </button>
            <button 
              className="btn-token-cancel"
              onClick={() => {
                setShowTokenInput(false);
                setToken('');
              }}
            >
              ✕ Cancelar
            </button>
          </div>
          <p className="token-help">
            💡 <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
              Crie um token aqui
            </a> com permissão de "gist". Token não é armazenado em servidor.
          </p>
        </div>
      )}
    </div>
  );
};

export default GitHubLogin;
