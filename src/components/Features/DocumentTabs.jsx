import React, { useState } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import './DocumentTabs.css';

const DocumentTabs = () => {
  const { documents, activeDocId, setActiveDocId, deleteDocument, renameDocument } = useDocuments();
  const [renamingId, setRenamingId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const handleRename = (docId, currentTitle) => {
    setRenamingId(docId);
    setNewTitle(currentTitle);
  };

  const submitRename = (docId) => {
    if (newTitle.trim()) {
      renameDocument(docId, newTitle);
    }
    setRenamingId(null);
  };

  const handleDeleteClick = (e, docId) => {
    e.stopPropagation();
    if (documents.length > 1) {
      if (window.confirm('Tem certeza que deseja deletar este documento?')) {
        deleteDocument(docId);
      }
    } else {
      alert('Você deve ter pelo menos um documento aberto');
    }
  };

  return (
    <div className="document-tabs">
      {documents.map(doc => (
        <div
          key={doc.id}
          className={`tab ${activeDocId === doc.id ? 'active' : ''}`}
          onClick={() => setActiveDocId(doc.id)}
        >
          <div className="tab-content">
            {renamingId === doc.id ? (
              <input
                autoFocus
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => submitRename(doc.id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') submitRename(doc.id);
                }}
                className="tab-rename-input"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <span 
                  className="tab-title"
                  onDoubleClick={() => handleRename(doc.id, doc.title)}
                  title="Clique duas vezes para renomear"
                >
                  {doc.title}
                </span>
                {!doc.isSaved && <span className="unsaved-dot">●</span>}
              </>
            )}
          </div>
          <button
            className="tab-close"
            onClick={(e) => handleDeleteClick(e, doc.id)}
            title="Deletar documento"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentTabs;
