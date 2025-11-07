import { useState, useCallback } from 'react';

export const useEditorTabs = () => {
  const [activeTab, setActiveTab] = useState('markdown');
  const [markdownContent, setMarkdownContent] = useState('# Bem-vindo ao Editor Multi-aba\n\nEscreva seu markdown aqui...');
  const [htmlContent, setHtmlContent] = useState('<h1>Bem-vindo ao HTML Editor</h1>\n<p>Escreva seu HTML aqui...</p>');
  const [cssContent, setCssContent] = useState('h1 {\n  color: #4a7ba7;\n  font-size: 2rem;\n}\n\np {\n  color: #333;\n  line-height: 1.6;\n}');

  const updateMarkdown = useCallback((content) => {
    setMarkdownContent(content);
  }, []);

  const updateHtml = useCallback((content) => {
    setHtmlContent(content);
  }, []);

  const updateCss = useCallback((content) => {
    setCssContent(content);
  }, []);

  const switchTab = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  return {
    activeTab,
    markdownContent,
    htmlContent,
    cssContent,
    updateMarkdown,
    updateHtml,
    updateCss,
    switchTab,
  };
};

export default useEditorTabs;
