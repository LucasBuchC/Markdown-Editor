import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Inicializar com valor do localStorage ou valor inicial
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
      return initialValue;
    }
  });

  // Auto-save após 1 segundo de inatividade
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log('✅ Auto-save realizado');
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [key, value]);

  return [value, setValue];
};
