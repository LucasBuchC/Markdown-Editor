import React, { useState, useEffect } from 'react';
import { listGists, deleteGist, getGistFileContent, createGist, updateGist } from '../../utils/githubAPI';
import './GistManager.css';

const GistManager = ({ isOpen, onClose, onLoadGist, isAuthenticated }) => {
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadGists();
    }
  }, [isOpen, isAuthenticated]);

  const loadGists = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listGists();
      setGists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadGist = async (gist) => {
    try {
      const firstFile = Object.values(gist.files)[0];
      const content = await getGistFileContent(gist, firstFile.filename);
      onLoadGist({
        id: gist.id,
        title: gist.description || 'Documento do Gist',
        content,
        gistUrl: gist.html_url
      });
      onClose();
    } catch (err) {
      alert('Erro ao carregar Gist: ' + err.message);
    }
  };

  const handleDeleteGist = async (gistId) => {
    if (!window.confirm('Deletar este Gist?')) return;

    try {
      await deleteGist(gistId);
      setGists(gists.filter(g => g.id !== gistId));
    } catch (err) {
      alert('Erro ao deletar Gist: ' + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="gist-manager-content" onClick={(e) => e.stopPropagation()}>
        <div className="gist-header">
          <h2>📚 Meus Gists</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="gist-body">
          {loading && <p className="loading">Carregando Gists...</p>}
          {error && <p className="error">Erro: {error}</p>}
          
          {!loading && gists.length === 0 && (
            <p className="empty">Nenhum Gist encontrado</p>
          )}

          {!loading && gists.length > 0 && (
            <div className="gists-list">
              {gists.map(gist => {
                const firstFile = Object.values(gist.files)[0];
                return (
                  <div key={gist.id} className="gist-item">
                    <div className="gist-info">
                      <h3>{gist.description || 'Sem título'}</h3>
                      <p className="gist-details">
                        {gist.public ? '🌍 Público' : '🔒 Privado'} • {new Date(gist.updated_at).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="gist-file">{firstFile.filename}</p>
                    </div>
                    <div className="gist-actions">
                      <button
                        className="btn-load-gist"
                        onClick={() => handleLoadGist(gist)}
                      >
                        Carregar
                      </button>
                      <a
                        href={gist.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-view-github"
                      >
                        GitHub
                      </a>
                      <button
                        className="btn-delete-gist"
                        onClick={() => handleDeleteGist(gist.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="gist-footer">
          <button className="btn-refresh" onClick={loadGists}>
            🔄 Atualizar
          </button>
          <button className="btn-close-modal" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GistManager;
