import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useMarkdown = () => {
  const [markdown, setMarkdown] = useLocalStorage('markdown-content', `# 📝 Bem-vindo ao Markdown Editor Pro

## Recursos
- ✨ Preview em tempo real
- 💾 Auto-save automático
- 📊 Estatísticas de texto
- 🌓 Modo claro/escuro

## Exemplo de código

\`\`\`javascript
function hello() {
  console.log("Hello World!");
}
\`\`\`

**Comece a editar agora!**`);

  const [history, setHistory] = useState([markdown]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateMarkdown = (newValue) => {
    setMarkdown(newValue);
    // Adicionar ao histórico
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newValue]);
    setHistoryIndex(historyIndex + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setMarkdown(history[newIndex]);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return { 
    markdown, 
    updateMarkdown, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  };
};
