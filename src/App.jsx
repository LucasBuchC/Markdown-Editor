import React, { useState, useMemo, useRef, useEffect } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useMarkdown } from './hooks/useMarkdown';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDocuments } from './hooks/useDocuments';
import { useVersionHistory } from './hooks/useVersionHistory';
import { useAnalytics } from './hooks/useAnalytics';
import { useEditorTabs } from './hooks/useEditorTabs';
import { calculateStats } from './utils/textStats';
import { exportToPDF, exportToHTML, generateFilename } from './utils/exportFunctions';
import { createGist, updateGist } from './utils/githubAPI';
import { calculateReadability, extractKeywords, expandSnippet } from './utils/advancedFeatures';
import ExportModal from './components/Features/ExportModal';
import TemplateSelector from './components/Features/TemplateSelector';
import DocumentTabs from './components/Features/DocumentTabs';
import DocumentManager from './components/Features/DocumentManager';
import VersionTimeline from './components/Features/VersionTimeline';
import GitHubLogin from './components/Features/GitHubLogin';
import GistManager from './components/Features/GistManager';
import ReadabilityAnalysis from './components/Features/ReadabilityAnalysis';
import KeywordsCloud from './components/Features/KeywordsCloud';
import Dashboard from './components/Features/Dashboard';
import TableOfContents from './components/Features/TableOfContents';
import SearchReplace from './components/Features/SearchReplace';
import MultiEditorContainer from './components/Features/MultiEditorContainer';
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

  const { trackDocumentEdit } = useAnalytics();

  const activeDoc = getActiveDocument();
  
  const [localMarkdown, setLocalMarkdown] = useState(activeDoc?.content || '');
  const {
    activeTab,
    markdownContent,
    htmlContent,
    cssContent,
    updateMarkdown,
    updateHtml,
    updateCss,
    switchTab,
  } = useEditorTabs();

  useEffect(() => {
    if (activeDoc) {
      setLocalMarkdown(activeDoc.content);
    }
  }, [activeDocId, activeDoc]);

  useVersionHistory(activeDoc?.id, localMarkdown, activeDoc?.title);

  const [theme, setTheme] = useState('light');
  const [previewMode, setPreviewMode] = useState('live');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isDocumentManagerOpen, setIsDocumentManagerOpen] = useState(false);
  const [isVersionTimelineOpen, setIsVersionTimelineOpen] = useState(false);
  const [isGistManagerOpen, setIsGistManagerOpen] = useState(false);
  const [isReadabilityOpen, setIsReadabilityOpen] = useState(false);
  const [isKeywordsCloudOpen, setIsKeywordsCloudOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isTOCVisible, setIsTOCVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [fileName, setFileName] = useState('documento');
  const [notification, setNotification] = useState(null);
  const [isGitHubAuthenticated, setIsGitHubAuthenticated] = useState(false);
  const [githubUser, setGithubUser] = useState(null);
  const [isSyncingToGist, setIsSyncingToGist] = useState(false);
  const [customSnippets, setCustomSnippets] = useState({});
  const [editTimeout, setEditTimeout] = useState(null);
  
  const previewRef = useRef(null);

  const stats = useMemo(() => calculateStats(localMarkdown), [localMarkdown]);

  // Track edits para analytics com debounce
  useEffect(() => {
    if (activeDoc && editTimeout) {
      clearTimeout(editTimeout);
    }

    const timeout = setTimeout(() => {
      if (activeDoc) {
        trackDocumentEdit(activeDoc.id, localMarkdown.length, activeDoc.title);
      }
    }, 5000); // Rastrear a cada 5 segundos de inatividade

    setEditTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [localMarkdown, activeDoc, trackDocumentEdit]);

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
    },
    {
      key: 'r',
      ctrl: true,
      shift: false,
      alt: false,
      action: () => setIsReadabilityOpen(prev => !prev)
    },
    {
      key: 'd',
      ctrl: true,
      shift: false,
      alt: false,
      action: () => setIsDashboardOpen(prev => !prev)
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

  const handleGitHubStatusChange = (authenticated, user) => {
    setIsGitHubAuthenticated(authenticated);
    setGithubUser(user);
  };

  const handlePushToGist = async (isPublic = false) => {
    if (!isGitHubAuthenticated) {
      alert('Você precisa estar conectado ao GitHub primeiro');
      return;
    }

    if (!activeDoc) {
      alert('Nenhum documento aberto');
      return;
    }

    setIsSyncingToGist(true);
    try {
      const filename = `${activeDoc.title || 'documento'}.md`;
      
      if (activeDoc.gistId) {
        await updateGist(activeDoc.gistId, filename, localMarkdown);
        showNotification('Gist atualizado no GitHub!');
      } else {
        const gist = await createGist(filename, localMarkdown, isPublic);
        updateDocument(activeDoc.id, { gistId: gist.id, gistUrl: gist.html_url });
        showNotification(`Novo Gist criado! 🔗 ${gist.html_url}`);
      }
    } catch (error) {
      showNotification('Erro ao salvar no GitHub: ' + error.message, 'error');
      console.error('Erro:', error);
    } finally {
      setIsSyncingToGist(false);
    }
  };

  const handleLoadGistContent = (gistData) => {
    const newDoc = createDocument(gistData.title);
    handleMarkdownChange(gistData.content);
    updateDocument(newDoc.id, { 
      gistId: gistData.id,
      gistUrl: gistData.gistUrl
    });
    showNotification('Gist carregado com sucesso!');
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
          <span className="badge">Fase 9</span>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setIsDocumentManagerOpen(true)}
            title="Gerenciar documentos"
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
            onClick={() => setIsDashboardOpen(true)}
            title="Dashboard (Ctrl+D)"
          >
            📊 Dashboard
          </button>
          <button 
            onClick={() => setIsVersionTimelineOpen(true)}
            title="Histórico de versões (Ctrl+H)"
          >
            📜 Histórico
          </button>
          <button 
            onClick={() => setIsReadabilityOpen(true)}
            title="Análise de legibilidade (Ctrl+R)"
          >
            📊 Leitura
          </button>
          <button 
            onClick={() => setIsKeywordsCloudOpen(true)}
            title="Nuvem de palavras-chave"
          >
            ☁️ Palavras
          </button>
          <button 
            onClick={() => setIsGistManagerOpen(true)}
            disabled={!isGitHubAuthenticated}
            title={isGitHubAuthenticated ? "Meus Gists" : "Conecte-se ao GitHub"}
          >
            📚 Gists
          </button>
          <button 
            onClick={() => handlePushToGist(false)}
            disabled={!isGitHubAuthenticated || isSyncingToGist}
            title={isGitHubAuthenticated ? "Enviar para GitHub" : "Conecte-se ao GitHub"}
          >
            {isSyncingToGist ? '⏳' : '🚀'} GitHub
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

      <div className="header-secondary">
        <GitHubLogin onStatusChange={handleGitHubStatusChange} />
      </div>

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

      <div className="editor-wrapper">
        <MultiEditorContainer
          theme={theme}
          onMarkdownChange={handleMarkdownChange}
          onHtmlChange={updateHtml}
          onCssChange={updateCss}
          markdownContent={localMarkdown}
          htmlContent={htmlContent}
          cssContent={cssContent}
        />
      </div>

      <footer className="footer">
        <p>💡 Ctrl+N (Novo) | Ctrl+S (Salvar) | Ctrl+F (Buscar) | Ctrl+H (Histórico) | Ctrl+R (Leitura) | Ctrl+D (Dashboard)</p>
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

      <Dashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
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

      <ReadabilityAnalysis
        markdown={localMarkdown}
        isVisible={isReadabilityOpen}
        onClose={() => setIsReadabilityOpen(false)}
      />

      <KeywordsCloud
        markdown={localMarkdown}
        isVisible={isKeywordsCloudOpen}
        onClose={() => setIsKeywordsCloudOpen(false)}
      />

      <GistManager
        isOpen={isGistManagerOpen}
        onClose={() => setIsGistManagerOpen(false)}
        onLoadGist={handleLoadGistContent}
        isAuthenticated={isGitHubAuthenticated}
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
