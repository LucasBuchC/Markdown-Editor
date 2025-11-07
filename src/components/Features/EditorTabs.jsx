import React from 'react';
import './EditorTabs.css';

const EditorTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'markdown', label: '📝 Markdown', icon: '📝' },
    { id: 'html', label: '🌐 HTML', icon: '🌐' },
    { id: 'css', label: '🎨 CSS', icon: '🎨' },
  ];

  return (
    <div className="editor-tabs-container">
      <div className="editor-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            title={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditorTabs;
