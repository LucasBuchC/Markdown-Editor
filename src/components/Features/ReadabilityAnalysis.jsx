import React from 'react';
import { calculateReadability } from '../../utils/advancedFeatures';
import './ReadabilityAnalysis.css';

const ReadabilityAnalysis = ({ markdown, isVisible, onClose }) => {
  const analysis = calculateReadability(markdown);

  if (!isVisible) return null;

  const getGradeColor = (grade) => {
    if (grade < 6) return '#4caf50';
    if (grade < 9) return '#8bc34a';
    if (grade < 12) return '#ff9800';
    if (grade < 14) return '#ff5722';
    return '#f44336';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="readability-content" onClick={(e) => e.stopPropagation()}>
        <div className="readability-header">
          <h2>📊 Análise de Legibilidade</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="readability-body">
          <div className="readability-card">
            <div className="score-circle" style={{ background: getGradeColor(analysis.grade) }}>
              <span className="score-value">{analysis.grade}</span>
              <span className="score-label">Grau</span>
            </div>
            <div className="score-details">
              <h3>{analysis.difficulty}</h3>
              <p>Nível de dificuldade de leitura</p>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-label">📝 Palavras</span>
              <span className="metric-value">{analysis.words}</span>
            </div>
            <div className="metric">
              <span className="metric-label">🔤 Sílabas</span>
              <span className="metric-value">{analysis.syllables}</span>
            </div>
            <div className="metric">
              <span className="metric-label">⏹️ Sentenças</span>
              <span className="metric-value">{analysis.sentences}</span>
            </div>
            <div className="metric">
              <span className="metric-label">📐 Média</span>
              <span className="metric-value">
                {analysis.words > 0 ? (analysis.words / analysis.sentences).toFixed(1) : 0}
              </span>
            </div>
          </div>

          <div className="readability-guide">
            <h4>📚 Escala de Dificuldade</h4>
            <ul>
              <li>0-6: <strong>Muito Fácil</strong> - Ensino fundamental</li>
              <li>6-9: <strong>Fácil</strong> - Ensino médio inicial</li>
              <li>9-12: <strong>Intermediário</strong> - Ensino médio final</li>
              <li>12-14: <strong>Difícil</strong> - Universitário</li>
              <li>14+: <strong>Muito Difícil</strong> - Especializado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadabilityAnalysis;
