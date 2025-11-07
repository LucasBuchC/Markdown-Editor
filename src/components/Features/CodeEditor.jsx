import React, { useRef } from 'react';
import CodeToolbar from './CodeToolbar';
import './CodeEditor.css';

const CodeEditor = ({ value, onChange, language = 'html', theme = 'light' }) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleInsert = (code, cursorOffset) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = value || '';
    
    // Inserir código na posição do cursor
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newText = before + code + after;
    
    onChange(newText);
    
    // Posicionar cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  return (
    <div className="code-editor-wrapper">
      <CodeToolbar language={language} onInsert={handleInsert} />
      <div className={`code-editor ${theme}`}>
        <textarea
          ref={textareaRef}
          className="code-textarea"
          value={value}
          onChange={handleChange}
          spellCheck="false"
          placeholder={`Escreva seu código ${language.toUpperCase()} aqui...`}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
