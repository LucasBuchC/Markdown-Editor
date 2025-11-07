// src/components/Features/TemplateSelector.jsx
import React, { useState } from 'react';
import { templates, getCategories, getTemplatesByCategory } from "../../utils/templates";
import "./TemplateSelector.css";

const TemplateSelector = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const categories = getCategories();
  const filteredTemplates = getTemplatesByCategory(selectedCategory).filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template.content);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="template-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="template-modal-header">
          <div>
            <h2>📑 Selecionar Template</h2>
            <p>Escolha um template para começar seu documento</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="template-search-section">
          <input
            type="text"
            placeholder="🔍 Buscar templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="template-search"
          />
        </div>

        <div className="template-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="templates-grid">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="template-card-header">
                  <h3>{template.name}</h3>
                  <span className="template-category">{template.category}</span>
                </div>
                <p className="template-description">{template.description}</p>
                <button className="template-use-btn">
                  Usar Template →
                </button>
              </div>
            ))
          ) : (
            <div className="no-templates">
              <p>😕 Nenhum template encontrado</p>
              <span>Tente buscar com outros termos</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
