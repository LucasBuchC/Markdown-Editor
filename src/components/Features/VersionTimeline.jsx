import React, { useState } from 'react';
import { useVersionHistory } from '../../hooks/useVersionHistory';
import { useDocuments } from '../../hooks/useDocuments';
import './VersionTimeline.css';

const VersionTimeline = ({ isOpen, onClose, onRestoreVersion }) => {
  const { getActiveDocument } = useDocuments();
  const activeDoc = getActiveDocument();
  const { getVersions, restoreVersion, deleteVersion } = useVersionHistory(
    activeDoc?.id,
    activeDoc?.content,
    activeDoc?.title
  );
  
  const [selectedVersion, setSelectedVersion] = useState(null);
  const docVersions = getVersions(activeDoc?.id);

  if (!isOpen || !activeDoc) return null;

  const handleRestoreClick = (versionId) => {
    const content = restoreVersion(activeDoc.id, versionId);
    if (content !== null) {
      onRestoreVersion(content);
      setSelectedVersion(null);
    }
  };

  const handleDeleteVersion = (versionId) => {
    if (window.confirm('Deletar esta versão?')) {
      deleteVersion(activeDoc.id, versionId);
      if (selectedVersion === versionId) {
        setSelectedVersion(null);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="version-timeline-content" onClick={(e) => e.stopPropagation()}>
        <div className="timeline-header">
          <h2>📜 Histórico de Versões</h2>
          <p className="version-count">{docVersions.length} versões salvas</p>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="timeline-body">
          {docVersions.length === 0 ? (
            <div className="no-versions">
              <p>Nenhuma versão salva ainda</p>
              <span>Comece a editar para criar versões automáticas</span>
            </div>
          ) : (
            <div className="versions-list">
              {docVersions.map((version, index) => (
                <div
                  key={version.id}
                  className={`version-item ${selectedVersion === version.id ? 'active' : ''}`}
                  onClick={() => setSelectedVersion(version.id)}
                >
                  <div className="version-marker">
                    {index === 0 ? '●' : '○'}
                  </div>
                  
                  <div className="version-info">
                    <div className="version-time">
                      {new Date(version.timestamp).toLocaleString('pt-BR')}
                    </div>
                    <div className="version-size">
                      {(version.size / 1024).toFixed(1)} KB
                    </div>
                    {index === 0 && <span className="badge-latest">Atual</span>}
                  </div>

                  <div className="version-actions">
                    {index > 0 && (
                      <button
                        className="btn-restore-mini"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestoreClick(version.id);
                        }}
                        title="Restaurar"
                      >
                        ↶
                      </button>
                    )}
                    <button
                      className="btn-delete-mini"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteVersion(version.id);
                      }}
                      title="Deletar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedVersion && selectedVersion !== docVersions[0]?.id && (
          <div className="timeline-footer">
            <button
              className="btn-restore-full"
              onClick={() => handleRestoreClick(selectedVersion)}
            >
              ↶ Restaurar Esta Versão
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionTimeline;
