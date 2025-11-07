import React, { createContext, useCallback, useEffect, useState } from 'react';

export const VersionContext = createContext();

const VERSION_STORAGE_KEY = 'markdown_versions';
const TRASH_STORAGE_KEY = 'markdown_trash';
const SNAPSHOT_INTERVAL = 2 * 60 * 1000; // 2 minutos
const MAX_VERSIONS_PER_DOC = 50;
const TRASH_RETENTION_DAYS = 30;

export const VersionProvider = ({ children }) => {
  const [versions, setVersions] = useState({});
  const [trash, setTrash] = useState([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    loadVersionHistory();
    cleanExpiredTrash();
  }, []);

  // Criar snapshots automáticos periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      // Será chamado pelo hook que usa este context
    }, SNAPSHOT_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const loadVersionHistory = useCallback(() => {
    try {
      const saved = localStorage.getItem(VERSION_STORAGE_KEY);
      if (saved) {
        setVersions(JSON.parse(saved));
      }

      const savedTrash = localStorage.getItem(TRASH_STORAGE_KEY);
      if (savedTrash) {
        setTrash(JSON.parse(savedTrash));
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  }, []);

  const createSnapshot = useCallback((docId, content, title) => {
    setVersions(prev => {
      const docVersions = prev[docId] || [];
      
      // Verificar se o conteúdo realmente mudou
      if (docVersions.length > 0 && docVersions[0].content === content) {
        return prev;
      }

      const newSnapshot = {
        id: Date.now().toString(),
        content,
        title,
        timestamp: new Date().toISOString(),
        size: new Blob([content]).size
      };

      // Manter apenas as últimas N versões
      const updated = [newSnapshot, ...docVersions].slice(0, MAX_VERSIONS_PER_DOC);
      
      const newVersions = {
        ...prev,
        [docId]: updated
      };

      saveVersionHistory(newVersions);
      return newVersions;
    });
  }, []);

  const saveVersionHistory = (versionData) => {
    try {
      localStorage.setItem(VERSION_STORAGE_KEY, JSON.stringify(versionData));
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  };

  const getVersions = useCallback((docId) => {
    return versions[docId] || [];
  }, [versions]);

  const restoreVersion = useCallback((docId, versionId) => {
    const docVersions = versions[docId];
    if (!docVersions) return null;

    const version = docVersions.find(v => v.id === versionId);
    return version ? version.content : null;
  }, [versions]);

  const deleteVersion = useCallback((docId, versionId) => {
    setVersions(prev => {
      const updated = {
        ...prev,
        [docId]: prev[docId].filter(v => v.id !== versionId)
      };
      saveVersionHistory(updated);
      return updated;
    });
  }, []);

  const clearVersions = useCallback((docId) => {
    setVersions(prev => {
      const updated = { ...prev };
      delete updated[docId];
      saveVersionHistory(updated);
      return updated;
    });
  }, []);

  const moveToTrash = useCallback((doc) => {
    const trashedDoc = {
      ...doc,
      deletedAt: new Date().toISOString()
    };

    setTrash(prev => {
      const updated = [trashedDoc, ...prev];
      saveTrash(updated);
      return updated;
    });
  }, []);

  const restoreFromTrash = useCallback((docId) => {
    const trashedDoc = trash.find(d => d.id === docId);
    
    if (trashedDoc) {
      setTrash(prev => {
        const updated = prev.filter(d => d.id !== docId);
        saveTrash(updated);
        return updated;
      });
      return trashedDoc;
    }

    return null;
  }, [trash]);

  const deleteFromTrash = useCallback((docId) => {
    setTrash(prev => {
      const updated = prev.filter(d => d.id !== docId);
      saveTrash(updated);
      return updated;
    });
  }, []);

  const emptyTrash = useCallback(() => {
    setTrash([]);
    localStorage.removeItem(TRASH_STORAGE_KEY);
  }, []);

  const cleanExpiredTrash = useCallback(() => {
    const now = Date.now();
    const thirtyDaysMs = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    setTrash(prev => {
      const updated = prev.filter(doc => {
        const deletedTime = new Date(doc.deletedAt).getTime();
        return now - deletedTime < thirtyDaysMs;
      });
      
      if (updated.length !== prev.length) {
        saveTrash(updated);
      }
      
      return updated;
    });
  }, []);

  const saveTrash = (trashData) => {
    try {
      localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(trashData));
    } catch (error) {
      console.error('Erro ao salvar lixeira:', error);
    }
  };

  const getStorageSize = useCallback(() => {
    let size = 0;
    
    const versionData = JSON.stringify(versions);
    size += new Blob([versionData]).size;
    
    const trashData = JSON.stringify(trash);
    size += new Blob([trashData]).size;
    
    return size;
  }, [versions, trash]);

  const value = {
    versions,
    trash,
    createSnapshot,
    getVersions,
    restoreVersion,
    deleteVersion,
    clearVersions,
    moveToTrash,
    restoreFromTrash,
    deleteFromTrash,
    emptyTrash,
    getStorageSize,
    SNAPSHOT_INTERVAL
  };

  return (
    <VersionContext.Provider value={value}>
      {children}
    </VersionContext.Provider>
  );
};
