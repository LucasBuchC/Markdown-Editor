import React, { useMemo } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import './Dashboard.css';

const Dashboard = ({ isOpen, onClose }) => {
  const { getTotalStats, getEditsByDay, getEditsByHour, getRanking } = useAnalytics();

  const totalStats = useMemo(() => getTotalStats(), [getTotalStats]);
  const editsByDay = useMemo(() => getEditsByDay(), [getEditsByDay]);
  const editsByHour = useMemo(() => getEditsByHour(), [getEditsByHour]);
  const ranking = useMemo(() => getRanking(), [getRanking]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getRecentDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('pt-BR'));
    }
    
    return days;
  };

  const recentDays = getRecentDays();
  const maxEditsDay = Math.max(...recentDays.map(day => editsByDay[day] || 0), 1);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dashboard-content" onClick={(e) => e.stopPropagation()}>
        <div className="dashboard-header">
          <h2>📊 Dashboard de Produtividade</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dashboard-body">
          {/* Estatísticas Gerais */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">📄</span>
              <span className="stat-value">{totalStats.totalDocuments}</span>
              <span className="stat-label">Documentos</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">✏️</span>
              <span className="stat-value">{totalStats.totalEdits}</span>
              <span className="stat-label">Edições</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⏱️</span>
              <span className="stat-value">{formatTime(totalStats.totalTime)}</span>
              <span className="stat-label">Tempo Total</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🔤</span>
              <span className="stat-value">{(totalStats.totalCharacters / 1000).toFixed(1)}k</span>
              <span className="stat-label">Caracteres</span>
            </div>
          </div>

          {/* Atividade por Dia */}
          <div className="chart-section">
            <h3>📈 Atividade por Dia (Últimos 7 dias)</h3>
            <div className="bar-chart">
              {recentDays.map(day => (
                <div key={day} className="bar-item">
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{
                        height: `${((editsByDay[day] || 0) / maxEditsDay) * 100}%`
                      }}
                    />
                  </div>
                  <span className="bar-label">{editsByDay[day] || 0}</span>
                  <span className="bar-date">{day.split('/')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap de Horas */}
          <div className="chart-section">
            <h3>🔥 Heatmap - Hora do Dia</h3>
            <div className="heatmap">
              {Array.from({ length: 24 }, (_, i) => i).map(hour => {
                const edits = editsByHour[hour] || 0;
                const maxEdits = Math.max(...Object.values(editsByHour), 1);
                const intensity = (edits / maxEdits) * 100;
                
                return (
                  <div
                    key={hour}
                    className="heatmap-cell"
                    style={{
                      background: `rgba(102, 126, 234, ${intensity / 100})`
                    }}
                    title={`${hour}:00 - ${edits} edições`}
                  >
                    <span>{hour}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ranking de Documentos */}
          <div className="chart-section">
            <h3>🏆 Top 10 Documentos</h3>
            <div className="ranking-list">
              {ranking.length === 0 ? (
                <p className="empty">Nenhum documento editado ainda</p>
              ) : (
                ranking.map((doc, index) => (
                  <div key={doc.id} className="ranking-item">
                    <span className="ranking-number">#{index + 1}</span>
                    <div className="ranking-info">
                      <span className="ranking-title">{doc.title}</span>
                      <span className="ranking-details">
                        {doc.totalEdits} edições • {formatTime(doc.totalTime)}
                      </span>
                    </div>
                    <span className="ranking-edits">{doc.totalEdits}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-footer">
          <button className="btn-close" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
