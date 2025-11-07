import React, { useState } from 'react';
import './SearchReplace.css';

const SearchReplace = ({ markdown, onReplace, isVisible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(0);

  const findMatches = (text, search) => {
    if (!search) {
      setMatches([]);
      return;
    }

    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = useRegex ? search : search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(pattern, flags);
      const foundMatches = [];
      let match;

      while ((match = regex.exec(text)) !== null) {
        foundMatches.push({
          index: match.index,
          text: match[0],
          line: text.substring(0, match.index).split('\n').length
        });
      }

      setMatches(foundMatches);
      setCurrentMatch(foundMatches.length > 0 ? 0 : -1);
    } catch (error) {
      console.error('Erro ao buscar:', error);
      setMatches([]);
    }
  };

  const handleSearch = () => {
    findMatches(markdown, searchTerm);
  };

  const handleReplace = () => {
    if (matches.length === 0 || currentMatch === -1) return;

    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = useRegex ? searchTerm : searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(pattern, flags);
      
      let count = 0;
      const newText = markdown.replace(regex, (match) => {
        count++;
        return count === currentMatch + 1 ? replaceTerm : match;
      });

      onReplace(newText);
      findMatches(newText, searchTerm);
    } catch (error) {
      console.error('Erro ao substituir:', error);
    }
  };

  const handleReplaceAll = () => {
    if (!searchTerm || matches.length === 0) return;

    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = useRegex ? searchTerm : searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(pattern, flags);
      const newText = markdown.replace(regex, replaceTerm);

      onReplace(newText);
      setMatches([]);
      setCurrentMatch(-1);
    } catch (error) {
      console.error('Erro ao substituir tudo:', error);
    }
  };

  const navigateMatch = (direction) => {
    if (matches.length === 0) return;
    
    let newIndex = currentMatch + direction;
    if (newIndex < 0) newIndex = matches.length - 1;
    if (newIndex >= matches.length) newIndex = 0;
    
    setCurrentMatch(newIndex);
  };

  if (!isVisible) return null;

  return (
    <div className="search-replace-panel">
      <div className="search-replace-header">
        <h3>🔍 Buscar e Substituir</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="search-replace-body">
        <div className="search-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar..."
            className="search-input"
          />
          <button onClick={handleSearch} className="btn-search">
            Buscar
          </button>
        </div>

        <div className="search-group">
          <input
            type="text"
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="Substituir por..."
            className="search-input"
          />
        </div>

        <div className="search-options">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
            />
            <span>Diferenciar maiúsculas/minúsculas</span>
          </label>

          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
            />
            <span>Usar expressão regular</span>
          </label>
        </div>

        {matches.length > 0 && (
          <div className="search-results">
            <div className="results-info">
              <span>
                {currentMatch + 1} de {matches.length} resultados
              </span>
              <div className="navigation-btns">
                <button onClick={() => navigateMatch(-1)} title="Anterior">
                  ↑
                </button>
                <button onClick={() => navigateMatch(1)} title="Próximo">
                  ↓
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button
            onClick={handleReplace}
            disabled={matches.length === 0}
            className="btn-replace"
          >
            Substituir
          </button>
          <button
            onClick={handleReplaceAll}
            disabled={matches.length === 0}
            className="btn-replace-all"
          >
            Substituir Tudo ({matches.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchReplace;
