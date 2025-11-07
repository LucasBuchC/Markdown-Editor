import React from 'react';
import './CodeToolbar.css';

const CodeToolbar = ({ language, onInsert }) => {
  const htmlTools = [
    { label: 'Título', code: '<h1></h1>', cursor: 4 },
    { label: 'Parágrafo', code: '<p></p>', cursor: 3 },
    { label: 'Div', code: '<div>\n  \n</div>', cursor: 7 },
    { label: 'Link', code: '<a href=""></a>', cursor: 9 },
    { label: 'Imagem', code: '<img src="" alt="">', cursor: 10 },
    { label: 'Botão', code: '<button></button>', cursor: 8 },
    { label: 'Lista', code: '<ul>\n  <li></li>\n</ul>', cursor: 10 },
    { label: 'Input', code: '<input type="text" placeholder="">', cursor: 13 },
    { label: 'Form', code: '<form>\n  \n</form>', cursor: 8 },
    { label: 'Span', code: '<span></span>', cursor: 6 },
    { label: 'Strong', code: '<strong></strong>', cursor: 8 },
    { label: 'Table', code: '<table>\n  <tr>\n    <td></td>\n  </tr>\n</table>', cursor: 19 },
  ];

  const cssTools = [
    { label: 'Color', code: 'color: #000000;', cursor: 8 },
    { label: 'Background', code: 'background: #ffffff;', cursor: 13 },
    { label: 'Font Size', code: 'font-size: 16px;', cursor: 11 },
    { label: 'Margin', code: 'margin: 0;', cursor: 8 },
    { label: 'Padding', code: 'padding: 0;', cursor: 9 },
    { label: 'Width', code: 'width: 100%;', cursor: 7 },
    { label: 'Height', code: 'height: 100%;', cursor: 8 },
    { label: 'Display Flex', code: 'display: flex;\njustify-content: center;\nalign-items: center;', cursor: 14 },
    { label: 'Border', code: 'border: 1px solid #000;', cursor: 8 },
    { label: 'Border Radius', code: 'border-radius: 8px;', cursor: 15 },
    { label: 'Text Align', code: 'text-align: center;', cursor: 12 },
    { label: 'Font Weight', code: 'font-weight: bold;', cursor: 13 },
    { label: 'Flexbox', code: 'display: flex;\nflex-direction: row;\ngap: 10px;', cursor: 14 },
    { label: 'Grid', code: 'display: grid;\ngrid-template-columns: 1fr 1fr;', cursor: 14 },
    { label: 'Position', code: 'position: relative;', cursor: 10 },
    { label: 'Transform', code: 'transform: translateX(0);', cursor: 21 },
    { label: 'Transition', code: 'transition: all 0.3s;', cursor: 16 },
    { label: 'Box Shadow', code: 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);', cursor: 12 },
  ];

  const tools = language === 'html' ? htmlTools : cssTools;

  return (
    <div className="code-toolbar">
      <div className="toolbar-label">
        {language === 'html' ? '📝 Tags HTML' : '🎨 Propriedades CSS'}
      </div>
      <div className="toolbar-buttons">
        {tools.map((tool, index) => (
          <button
            key={index}
            className="toolbar-btn"
            onClick={() => onInsert(tool.code, tool.cursor)}
            title={`Inserir: ${tool.code.split('\n')[0]}`}
          >
            {tool.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CodeToolbar;
