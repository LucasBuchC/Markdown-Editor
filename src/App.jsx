import React, { useState, useMemo, useRef, useEffect } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useMarkdown } from './hooks/useMarkdown';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDocuments } from './hooks/useDocuments';
import { useVersionHistory } from './hooks/useVersionHistory';
import { calculateStats } from './utils/textStats';
import { exportToPDF, exportToHTML, generateFilename } from './utils/exportFunctions';
import ExportModal from './components/Features/ExportModal';
import TemplateSelector from './components/Features/TemplateSelector';
import DocumentTabs from './components/Features/DocumentTabs';
import DocumentManager from './components/Features/DocumentManager';
import VersionTimeline from './components/Features/VersionTimeline';
import TableOfContents from './components/Features/TableOfContents';
import SearchReplace from './components/Features/SearchReplace';
import './App.css';

function App() {
  const {
    documents,
    activeDocId,
    createDocument,
    updateDocument,
    getActiveDocument,
    markAsSaved,
    isLoading
  } = useDocuments();

  const activeDoc = getActiveDocument();
  
  // Use markdown hook só com o conteúdo do documento ativo
  const [localMarkdown, setLocalMarkdown] = useState(activeDoc?.content || '');

  // Sincronizar quando documento ativo muda
  useEffect(() => {
    if (activeDoc) {
      setLocalMarkdown(activeDoc.content);
    }
  }, [activeDocId, activeDoc]);

  // Usar hook de versionamento (cria snapshots automáticos)
  useVersionHistory(activeDoc?.id, localMarkdown, activeDoc?.title);

  const [theme, setTheme] = useState('light');
  const [previewMode, setPreviewMode] = useState('live');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isDocumentManagerOpen, setIsDocumentManagerOpen] = useState(false);
  const [isVersionTimelineOpen, setIsVersionTimelineOpen] = useState(false);
  const [isTOCVisible, setIsTOCVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [fileName, setFileName] = useState('documento');
  const [notification, setNotification] = useState(null);
  
  const previewRef = useRef(null);

  const stats = useMemo(() => calculateStats(localMarkdown), [localMarkdown]);

  // Atalhos de teclado
  useKeyboardShortcuts([
    {
      key: 's',
      ctrl: true,
      shift: false,
      alt: false,
      action: () => {
        if (activeDoc) {
          markAsSaved(activeDoc.id);
          showNotification('Documento salvo!');
        }
      }
    },
    {
      key: 'n',
      ctrl: true,
      shift: false,
      alt: false,
      action: () => {
        createDocument('Novo documento');
        showNotification('Novo documento criado!');
      }
    },
    {
      key: 'f',
      ctrl: true,
      shift: false,
      alt: false,
      action: () => setIsSearchVisible(prev => !prev)
    },
    {
      key: 'h',
      ctrl: true,
      shift: false,
      alt: false,
      action: () => setIsVersionTimelineOpen(prev => !prev)
    }
  ]);

  const customCommands = [
    commands.group([
      commands.title1,
      commands.title2,
      commands.title3,
      commands.title4,
    ], {
      name: 'titles',
      groupName: 'Títulos',
      buttonProps: { 'aria-label': 'Inserir título' }
    }),
    commands.divider,
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.hr,
    commands.divider,
    commands.link,
    commands.quote,
    commands.code,
    commands.codeBlock,
    commands.divider,
    commands.unorderedListCommand,
    commands.orderedListCommand,
    commands.checkedListCommand,
    commands.divider,
    commands.table,
    commands.divider,
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleMarkdownChange = (value) => {
    setLocalMarkdown(value || '');
    if (activeDoc) {
      updateDocument(activeDoc.id, { content: value || '' });
    }
  };

  const handleSelectTemplate = (templateContent) => {
    if (localMarkdown && localMarkdown.trim() !== '') {
      if (window.confirm('Substituir o conteúdo?')) {
        handleMarkdownChange(templateContent);
        showNotification('Template aplicado!');
      }
    } else {
      handleMarkdownChange(templateContent);
      showNotification('Template aplicado!');
    }
  };

  const handleExport = async (format, filename, includeTimestamp) => {
    const finalFilename = includeTimestamp ? generateFilename(filename) : filename;

    try {
      if (format === 'pdf') {
        const previewElement = document.querySelector('.wmde-markdown');
        if (previewElement) {
          await exportToPDF(previewElement, finalFilename);
          showNotification('PDF exportado!');
        }
      } else if (format === 'html') {
        const htmlContent = document.querySelector('.wmde-markdown')?.innerHTML || '';
        exportToHTML(htmlContent, finalFilename);
        showNotification('HTML exportado!');
      } else if (format === 'md') {
        const blob = new Blob([localMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${finalFilename}.md`;
        a.click();
        URL.revokeObjectURL(url);
        showNotification('Markdown exportado!');
      }
    } catch (error) {
      showNotification('Erro ao exportar', 'error');
      console.error('Erro:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">📝</div>
        <p>Carregando documentos...</p>
      </div>
    );
  }

  return (
    <div className={`app ${theme}`} data-color-mode={theme}>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <header className="header">
        <div className="header-left">
          <h1>📝 Markdown Editor Pro</h1>
          <span className="badge">Fase 6</span>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setIsDocumentManagerOpen(true)}
            title="Gerenciar documentos (Ctrl+O)"
          >
            📂 Documentos
          </button>
          <button 
            onClick={() => createDocument()}
            title="Novo documento (Ctrl+N)"
          >
            ➕ Novo
          </button>
          <button 
            onClick={() => setIsTemplateSelectorOpen(true)}
            title="Templates"
          >
            📑 Modelos
          </button>
          <button 
            onClick={() => setIsVersionTimelineOpen(true)}
            title="Histórico de versões (Ctrl+H)"
          >
            📜 Histórico
          </button>
          <button 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            title="Buscar (Ctrl+F)"
          >
            🔍 Buscar
          </button>
          <button 
            onClick={() => setIsTOCVisible(!isTOCVisible)}
            title="Índice"
          >
            📑 Índice
          </button>
          <button onClick={toggleTheme} title="Tema">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            title="Exportar"
            className="btn-primary"
          >
            📥 Exportar
          </button>
        </div>
      </header>

      <DocumentTabs />

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">📝</span>
          <span className="stat-value">{stats.words}</span>
          <span className="stat-label">palavras</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔤</span>
          <span className="stat-value">{stats.characters}</span>
          <span className="stat-label">caracteres</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📄</span>
          <span className="stat-value">{stats.lines}</span>
          <span className="stat-label">linhas</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">⏱️</span>
          <span className="stat-value">~{stats.readTime}</span>
          <span className="stat-label">min</span>
        </div>
        <div className="stat-item auto-save">
          <span className="stat-icon">💾</span>
          <span className="stat-label">Auto-save</span>
        </div>
      </div>

      <div className="preview-controls">
        <button 
          className={previewMode === 'edit' ? 'active' : ''}
          onClick={() => setPreviewMode('edit')}
        >
          ✏️ Editor
        </button>
        <button 
          className={previewMode === 'live' ? 'active' : ''}
          onClick={() => setPreviewMode('live')}
        >
          👁️ Split
        </button>
        <button 
          className={previewMode === 'preview' ? 'active' : ''}
          onClick={() => setPreviewMode('preview')}
        >
          📖 Preview
        </button>
      </div>

      <div className="editor-container" ref={previewRef}>
        <MDEditor
          value={localMarkdown}
          onChange={handleMarkdownChange}
          preview={previewMode}
          height="auto"
          commands={customCommands}
          enableScroll={true}
          highlightEnable={true}
          visibleDragbar={true}
        />
      </div>

      <footer className="footer">
        <p>💡 Ctrl+N (Novo) | Ctrl+S (Salvar) | Ctrl+F (Buscar) | Ctrl+H (Histórico)</p>
      </footer>

      {/* Modais */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        fileName={fileName}
        setFileName={setFileName}
      />

      <TemplateSelector
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <DocumentManager
        isOpen={isDocumentManagerOpen}
        onClose={() => setIsDocumentManagerOpen(false)}
      />

      <VersionTimeline
        isOpen={isVersionTimelineOpen}
        onClose={() => setIsVersionTimelineOpen(false)}
        onRestoreVersion={(content) => {
          handleMarkdownChange(content);
          showNotification('Versão restaurada!');
          setIsVersionTimelineOpen(false);
        }}
      />

      <TableOfContents
        markdown={localMarkdown}
        isVisible={isTOCVisible}
        onClose={() => setIsTOCVisible(false)}
      />

      <SearchReplace
        markdown={localMarkdown}
        onReplace={handleMarkdownChange}
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
      />
    </div>
  );
}

export default App;
