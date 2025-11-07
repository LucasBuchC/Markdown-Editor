import React, { createContext, useCallback, useEffect, useState } from 'react';

export const AnalyticsContext = createContext();

const ANALYTICS_STORAGE_KEY = 'markdown_analytics';

export const AnalyticsProvider = ({ children }) => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = useCallback(() => {
    try {
      const saved = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      if (saved) {
        setAnalytics(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
    }
  }, []);

  const trackDocumentEdit = useCallback((docId, contentLength, title) => {
    setAnalytics(prev => {
      const docAnalytics = prev[docId] || {
        id: docId,
        title,
        totalEdits: 0,
        totalTime: 0,
        lastEdited: null,
        createdAt: new Date().toISOString(),
        edits: [],
        maxLength: 0
      };

      const now = new Date();
      const lastEdit = docAnalytics.edits[docAnalytics.edits.length - 1];
      let timeDiff = 0;

      if (lastEdit) {
        timeDiff = (now - new Date(lastEdit.timestamp)) / 1000; // em segundos
      }

      const newEdit = {
        timestamp: now.toISOString(),
        contentLength,
        timeDiff: Math.min(timeDiff, 300) // máximo 5 minutos por edição
      };

      const updated = {
        ...prev,
        [docId]: {
          ...docAnalytics,
          title,
          totalEdits: docAnalytics.totalEdits + 1,
          totalTime: docAnalytics.totalTime + newEdit.timeDiff,
          lastEdited: now.toISOString(),
          maxLength: Math.max(docAnalytics.maxLength, contentLength),
          edits: [...docAnalytics.edits.slice(-100), newEdit] // manter últimas 100 edições
        }
      };

      saveAnalytics(updated);
      return updated;
    });
  }, []);

  const saveAnalytics = (analyticsData) => {
    try {
      localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analyticsData));
    } catch (error) {
      console.error('Erro ao salvar analytics:', error);
    }
  };

  const getDocumentStats = useCallback((docId) => {
    return analytics[docId] || null;
  }, [analytics]);

  const getAllStats = useCallback(() => {
    return Object.values(analytics);
  }, [analytics]);

  const getTotalStats = useCallback(() => {
    const stats = Object.values(analytics);
    
    return {
      totalDocuments: stats.length,
      totalEdits: stats.reduce((sum, doc) => sum + doc.totalEdits, 0),
      totalTime: stats.reduce((sum, doc) => sum + doc.totalTime, 0),
      totalCharacters: stats.reduce((sum, doc) => sum + doc.maxLength, 0),
      lastActive: stats.reduce((latest, doc) => {
        const docTime = new Date(doc.lastEdited).getTime();
        const latestTime = latest ? new Date(latest.lastEdited).getTime() : 0;
        return docTime > latestTime ? doc : latest;
      }, null)
    };
  }, [analytics]);

  const getEditsByDay = useCallback(() => {
    const byDay = {};

    Object.values(analytics).forEach(doc => {
      doc.edits.forEach(edit => {
        const date = new Date(edit.timestamp).toLocaleDateString('pt-BR');
        byDay[date] = (byDay[date] || 0) + 1;
      });
    });

    return byDay;
  }, [analytics]);

  const getEditsByHour = useCallback(() => {
    const byHour = {};

    for (let i = 0; i < 24; i++) {
      byHour[i] = 0;
    }

    Object.values(analytics).forEach(doc => {
      doc.edits.forEach(edit => {
        const hour = new Date(edit.timestamp).getHours();
        byHour[hour]++;
      });
    });

    return byHour;
  }, [analytics]);

  const getRanking = useCallback(() => {
    return Object.values(analytics)
      .sort((a, b) => b.totalEdits - a.totalEdits)
      .slice(0, 10);
  }, [analytics]);

  const value = {
    analytics,
    trackDocumentEdit,
    getDocumentStats,
    getAllStats,
    getTotalStats,
    getEditsByDay,
    getEditsByHour,
    getRanking
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
