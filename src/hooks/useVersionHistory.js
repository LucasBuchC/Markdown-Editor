import { useContext, useEffect, useRef } from 'react';
import { VersionContext } from '../contexts/VersionContext';

export const useVersionHistory = (docId, content, title) => {
  const context = useContext(VersionContext);
  const lastContentRef = useRef(content);
  const snapshotTimeoutRef = useRef(null);

  if (!context) {
    throw new Error('useVersionHistory deve ser usado dentro de VersionProvider');
  }

  // Auto-criar snapshot quando conteúdo muda
  useEffect(() => {
    if (content !== lastContentRef.current) {
      lastContentRef.current = content;

      // Debounce de 2 segundos antes de criar snapshot
      if (snapshotTimeoutRef.current) {
        clearTimeout(snapshotTimeoutRef.current);
      }

      snapshotTimeoutRef.current = setTimeout(() => {
        context.createSnapshot(docId, content, title);
      }, 2000);
    }

    return () => {
      if (snapshotTimeoutRef.current) {
        clearTimeout(snapshotTimeoutRef.current);
      }
    };
  }, [docId, content, title, context]);

  return context;
};
