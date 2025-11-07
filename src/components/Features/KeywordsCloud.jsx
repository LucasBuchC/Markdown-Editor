import React from 'react';
import { extractKeywords } from '../../utils/advancedFeatures';
import './KeywordsCloud.css';

const KeywordsCloud = ({ markdown, isVisible, onClose }) => {
  const keywords = extractKeywords(markdown, 20);
  const maxFreq = Math.max(...keywords.map(k => k.frequency), 1);

  if (!isVisible) return null;

  const getSize = (freq) => {
    return Math.max(12, Math.min(32, (freq / maxFreq) * 32));
  };

  const getColor = (index) => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a'];
    return colors[index % colors.length];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="keywords-content" onClick={(e) => e.stopPropagation()}>
        <div className="keywords-header">
          <h2>☁️ Nuvem de Palavras-Chave</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="keywords-cloud">
          {keywords.map((keyword, index) => (
            <div
              key={keyword.word}
              className="keyword-tag"
              style={{
                fontSize: `${getSize(keyword.frequency)}px`,
                color: getColor(index),
                opacity: 0.6 + (keyword.frequency / maxFreq) * 0.4
              }}
              title={`Frequência: ${keyword.frequency}`}
            >
              {keyword.word}
            </div>
          ))}
        </div>

        <div className="keywords-stats">
          <span>📊 {keywords.length} palavras-chave encontradas</span>
        </div>
      </div>
    </div>
  );
};

export default KeywordsCloud;
