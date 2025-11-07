import React, { useEffect, useState } from 'react';
import './TableOfContents.css';

const TableOfContents = ({ markdown, isVisible, onClose }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!markdown) {
      setHeadings([]);
      return;
    }

    // Extrair todos os headings do markdown
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      matches.push({
        level,
        text,
        id,
        line: markdown.substring(0, match.index).split('\n').length
      });
    }

    setHeadings(matches);
  }, [markdown]);

  const scrollToHeading = (id) => {
    const element = document.querySelector(`[id="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isVisible || headings.length === 0) return null;

  return (
    <div className="toc-panel">
      <div className="toc-header">
        <h3>📑 Índice</h3>
        <button className="toc-close" onClick={onClose}>✕</button>
      </div>
      <nav className="toc-nav">
        {headings.map((heading, index) => (
          <a
            key={index}
            className={`toc-link level-${heading.level}`}
            onClick={() => scrollToHeading(heading.id)}
            style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
      <div className="toc-stats">
        <span>{headings.length} seções</span>
      </div>
    </div>
  );
};

export default TableOfContents;
