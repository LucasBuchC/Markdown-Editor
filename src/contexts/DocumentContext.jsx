import React, { createContext, useState, useCallback, useEffect } from 'react';

export const DocumentContext = createContext();

const STORAGE_KEY = 'markdown_documents';

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [activeDocId, setActiveDocId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar documentos do localStorage na inicialização
  useEffect(() => {
    loadDocuments();
    
    // Sincronizar entre abas usando storage event
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadDocuments = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setDocuments(parsed);
        
        // Se houver documentos, selecionar o último ativo
        if (parsed.length > 0) {
          const lastActive = localStorage.getItem('lastActiveDocId');
          const docToActive = lastActive 
            ? parsed.find(d => d.id === lastActive) 
            : parsed[0];
          if (docToActive) {
            setActiveDocId(docToActive.id);
          }
        }
      } else {
        // Criar documento inicial se não houver nenhum
        const initialDoc = {
          id: Date.now().toString(),
          title: 'Documento sem título',
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isSaved: true
        };
        setDocuments([initialDoc]);
        setActiveDocId(initialDoc.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([initialDoc]));
      }
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStorageChange = (e) => {
    if (e.key === STORAGE_KEY) {
      loadDocuments();
    }
  };

  const createDocument = useCallback((title = 'Documento sem título') => {
    const newDoc = {
      id: Date.now().toString(),
      title,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isSaved: true
    };

    setDocuments(prev => {
      const updated = [newDoc, ...prev];
      saveDocuments(updated);
      setActiveDocId(newDoc.id);
      return updated;
    });

    return newDoc;
  }, []);

  const updateDocument = useCallback((docId, updates) => {
    setDocuments(prev => {
      const updated = prev.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              ...updates,
              updatedAt: new Date().toISOString(),
              isSaved: false
            }
          : doc
      );
      saveDocuments(updated);
      return updated;
    });
  }, []);

  const deleteDocument = useCallback((docId) => {
    setDocuments(prev => {
      let updated = prev.filter(doc => doc.id !== docId);
      
      // Se não houver documentos, criar um novo
      if (updated.length === 0) {
        const newDoc = {
          id: Date.now().toString(),
          title: 'Documento sem título',
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isSaved: true
        };
        updated = [newDoc];
        setActiveDocId(newDoc.id);
      } else if (activeDocId === docId) {
        // Se deletou o ativo, mudar para outro
        setActiveDocId(updated[0].id);
      }
      
      saveDocuments(updated);
      return updated;
    });
  }, [activeDocId]);

  const renameDocument = useCallback((docId, newTitle) => {
    updateDocument(docId, { title: newTitle });
  }, [updateDocument]);

  const getActiveDocument = useCallback(() => {
    return documents.find(doc => doc.id === activeDocId);
  }, [documents, activeDocId]);

  const markAsSaved = useCallback((docId) => {
    setDocuments(prev => {
      const updated = prev.map(doc =>
        doc.id === docId
          ? { ...doc, isSaved: true }
          : doc
      );
      saveDocuments(updated);
      return updated;
    });
  }, []);

  const saveDocuments = (docs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    } catch (error) {
      console.error('Erro ao salvar documentos:', error);
    }
  };

  // Salvar último documento ativo
  useEffect(() => {
    if (activeDocId) {
      localStorage.setItem('lastActiveDocId', activeDocId);
    }
  }, [activeDocId]);

  const value = {
    documents,
    activeDocId,
    setActiveDocId,
    createDocument,
    updateDocument,
    deleteDocument,
    renameDocument,
    getActiveDocument,
    markAsSaved,
    isLoading
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
