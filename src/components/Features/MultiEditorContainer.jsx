import React, { useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import CodeEditor from './CodeEditor';
import PreviewPane from './PreviewPane';
import EditorTabs from './EditorTabs';
import './MultiEditorContainer.css';

const MultiEditorContainer = ({ 
  theme = 'light',
  onMarkdownChange,
  onHtmlChange,
  onCssChange,
  markdownContent = '',
  htmlContent = '',
  cssContent = ''
}) => {
  const [activeTab, setActiveTab] = useState('markdown');
  const [previewMode, setPreviewMode] = useState('live');
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'html' || tabId !== 'css') {
      setShowHtmlPreview(false);
    }
  };

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
  ];

  return (
    <div className={`multi-editor-container ${theme}`}>
        <EditorTabs activeTab={activeTab} onTabChange={handleTabChange} />


      {/* Markdown Tab */}
      {activeTab === 'markdown' && (
        <div className="tab-content markdown-tab">
          <div className="markdown-controls">
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
          <div className="markdown-editor">
            <MDEditor
              value={markdownContent}
              onChange={(val) => onMarkdownChange(val || '')}
              preview={previewMode}
              height="auto"
              commands={customCommands}
              enableScroll={true}
              highlightEnable={true}
              visibleDragbar={true}
              data-color-mode={theme}
            />
          </div>
        </div>
      )}

      {/* HTML/CSS Tab */}
      {(activeTab === 'html' || activeTab === 'css') && (
        <div className="tab-content html-css-tab">
          <div className="split-pane">
            <div className="editors-section">
              {activeTab === 'html' && (
                <div className="editor-split">
                  <div className="editor-label">HTML</div>
                  <CodeEditor
                    value={htmlContent}
                    onChange={onHtmlChange}
                    language="html"
                    theme={theme}
                  />
                </div>
              )}
              {activeTab === 'css' && (
                <div className="editor-split">
                  <div className="editor-label">CSS</div>
                  <CodeEditor
                    value={cssContent}
                    onChange={onCssChange}
                    language="css"
                    theme={theme}
                  />
                </div>
              )}
            </div>

            <div className="preview-section">
              <button 
                className="toggle-preview"
                onClick={() => setShowHtmlPreview(!showHtmlPreview)}
              >
                {showHtmlPreview ? '📖 Ocultar Preview' : '👁️ Ver Preview'}
              </button>
              {showHtmlPreview && (
                <PreviewPane
                  htmlContent={htmlContent}
                  cssContent={cssContent}
                  theme={theme}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiEditorContainer;
