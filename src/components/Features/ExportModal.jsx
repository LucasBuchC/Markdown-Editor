import React, { useState } from 'react';
import './ExportModal.css';

const ExportModal = ({ isOpen, onClose, onExport, fileName, setFileName }) => {
  const [format, setFormat] = useState('pdf');
  const [includeTimestamp, setIncludeTimestamp] = useState(true);

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(format, fileName, includeTimestamp);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📥 Exportar Documento</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Nome do arquivo:</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Digite o nome do arquivo"
              className="file-input"
            />
          </div>

          <div className="form-group">
            <label>Formato de exportação:</label>
            <div className="format-options">
              <label className={`format-option ${format === 'pdf' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={format === 'pdf'}
                  onChange={(e) => setFormat(e.target.value)}
                />
                <span className="format-icon">📄</span>
                <span>PDF</span>
              </label>

              <label className={`format-option ${format === 'html' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="format"
                  value="html"
                  checked={format === 'html'}
                  onChange={(e) => setFormat(e.target.value)}
                />
                <span className="format-icon">🌐</span>
                <span>HTML</span>
              </label>

              <label className={`format-option ${format === 'md' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="format"
                  value="md"
                  checked={format === 'md'}
                  onChange={(e) => setFormat(e.target.value)}
                />
                <span className="format-icon">📝</span>
                <span>Markdown</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeTimestamp}
                onChange={(e) => setIncludeTimestamp(e.target.checked)}
              />
              <span>Incluir data/hora no nome do arquivo</span>
            </label>
          </div>

          <div className="format-info">
            {format === 'pdf' && (
              <p>📄 O PDF será gerado com o layout renderizado, preservando estilos e formatação.</p>
            )}
            {format === 'html' && (
              <p>🌐 O HTML será exportado como uma página completa e independente.</p>
            )}
            {format === 'md' && (
              <p>📝 O arquivo Markdown será exportado no formato original (.md).</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-export" onClick={handleExport}>
            Exportar {format.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
