import React, { useState } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import './DocumentManager.css';

const DocumentManager = ({ isOpen, onClose }) => {
  const { documents, activeDocId, setActiveDocId, createDocument, deleteDocument } = useDocuments();
  const [newDocTitle, setNewDocTitle] = useState('');
  const [showNewDocForm, setShowNewDocForm] = useState(false);

  const handleCreateDocument = () => {
    if (newDocTitle.trim()) {
      createDocument(newDocTitle);
      setNewDocTitle('');
      setShowNewDocForm(false);
    }
  };

  const handleDeleteDocument = (docId) => {
    if (documents.length > 1) {
      if (window.confirm('Tem certeza?')) {
        deleteDocument(docId);
      }
    } else {
      alert('Você precisa ter pelo menos um documento');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="document-manager-content" onClick={(e) => e.stopPropagation()}>
        <div className="manager-header">
          <h2>📂 Meus Documentos</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="manager-body">
          {showNewDocForm ? (
            <div className="new-doc-form">
              <input
                autoFocus
                type="text"
                placeholder="Nome do documento..."
                value={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleCreateDocument();
                }}
                className="new-doc-input"
              />
              <div className="form-buttons">
                <button onClick={handleCreateDocument} className="btn-create">
                  Criar
                </button>
                <button onClick={() => {
                  setShowNewDocForm(false);
                  setNewDocTitle('');
                }} className="btn-cancel">
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowNewDocForm(true)} className="btn-new-doc">
              ➕ Novo Documento
            </button>
          )}

          <div className="documents-list">
            {documents.length === 0 ? (
              <p className="no-documents">Nenhum documento encontrado</p>
            ) : (
              documents.map(doc => (
                <div
                  key={doc.id}
                  className={`doc-item ${activeDocId === doc.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDocId(doc.id);
                    onClose();
                  }}
                >
                  <div className="doc-info">
                    <h3>{doc.title}</h3>
                    <p>
                      {doc.content.length} caracteres • Modificado em{' '}
                      {new Date(doc.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <button
                    className="btn-delete-doc"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDocument(doc.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="manager-stats">
          <span>📊 {documents.length} documentos</span>
          <span>💾 {documents.reduce((acc, doc) => acc + doc.content.length, 0)} caracteres totais</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
