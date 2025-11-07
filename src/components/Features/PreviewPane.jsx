import React from 'react';
import './PreviewPane.css';

const PreviewPane = ({ htmlContent, cssContent, theme = 'light' }) => {
  return (
    <div className={`preview-pane ${theme}`}>
      <iframe
        title="Preview"
        className="preview-iframe"
        srcDoc={`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                padding: 20px;
                background: ${theme === 'dark' ? '#1a2a47' : '#fff'};
                color: ${theme === 'dark' ? '#e8f0fe' : '#1a1a1a'};
              }
              ${cssContent || ''}
            </style>
          </head>
          <body>
            ${htmlContent || '<p style="color: #999;">Nenhum conteúdo HTML</p>'}
          </body>
          </html>
        `}
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
};

export default PreviewPane;
