# 🚀 Markdown Editor - Multi-Tab Features

## Visão Geral

Aplicação de edição avançada com suporte para **Markdown**, **HTML** e **CSS** em abas separadas com visualização em tempo real.

---

## ✨ Características Principais

### 📝 **Editor Multi-Aba**
- **Aba Markdown**: Editor completo com preview em tempo real (edit, split, preview)
- **Aba HTML**: Editor de código HTML com sintaxe destacada
- **Aba CSS**: Editor de código CSS com sintaxe destacada
- **Preview em Tempo Real**: Visualize HTML + CSS combinados em um iframe sandboxed

### 🎨 **Design & UX**
- **Tema Light/Dark**: Alternância automática com gradiente azul suave
- **Responsive Design**: Otimizado para desktop (1200px), tablet (1024px) e mobile (480px)
- **Interface Intuitiva**: 
  - Abas com ícones para identificação rápida
  - Botões com feedback visual hover e active states
  - Layout split-pane para melhor produtividade

### 📊 **Estatísticas em Tempo Real**
- Contagem de palavras
- Contagem de caracteres
- Contagem de linhas
- Tempo estimado de leitura
- Auto-save indicator

### 🛠️ **Recursos Avançados**
- Historiador de versões
- Templates predefinidos
- Sincronização com GitHub Gist
- Análise de legibilidade
- Nuvem de palavras-chave
- Dashboard com análises
- Tabela de conteúdos automática
- Buscar e Substituir

---

## 🎯 Componentes Técnicos

### **Editor Components**

#### `MultiEditorContainer.jsx`
- Container principal que gerencia todas as abas
- Estado centralizado para conteúdo de markdown, HTML e CSS
- Props: `theme`, callbacks de mudança, conteúdo inicial

#### `EditorTabs.jsx`
- Componente de navegação por abas
- Suporta ícones e labels responsivos
- Estados: active, hover

#### `CodeEditor.jsx`
- Editor genérico para HTML e CSS
- Textarea com overlay de sintaxe destacada
- Sincronização de scroll entre textarea e highlight

#### `PreviewPane.jsx`
- iframe sandboxed para renderização segura
- Injeção dinâmica de HTML + CSS
- Suporte para temas light/dark

### **Styling**

#### Core CSS Files
- `App.css`: Estilos globais + multi-editor styles
- `MultiEditorContainer.css`: Layout e estilos do container
- `EditorTabs.css`: Estilos das abas
- `CodeEditor.css`: Estilos do editor de código
- `PreviewPane.css`: Estilos do preview

#### Color Scheme
**Light Mode:**
- Gradiente: `#4a7ba7 → #6fb1d9 → #8ec5f1`
- Texto: `#1a1a1a`

**Dark Mode:**
- Gradiente: `#0f1623 → #1a2a47 → #2a3f5f`
- Texto: `#e8f0fe`

---

## 📱 Responsive Breakpoints

| Tamanho | Breakpoint | Ajustes |
|---------|------------|---------|
| Desktop | 1200px+ | Layout 2-colunas, split-pane completo |
| Tablet | 768px-1024px | Layout ajustado, preview reduzido |
| Mobile | <480px | Layout 1-coluna, abas otimizadas |

---

## 🚀 Como Usar

### Iniciar Desenvolvimento
```bash
npm install
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Estrutura de Pastas
```
src/
├── App.jsx                          # Componente principal
├── App.css                          # Estilos globais
├── components/Features/
│   ├── MultiEditorContainer.jsx     # Container multi-editor
│   ├── MultiEditorContainer.css     # Estilos container
│   ├── EditorTabs.jsx               # Navegação de abas
│   ├── EditorTabs.css               # Estilos de abas
│   ├── CodeEditor.jsx               # Editor de código
│   ├── CodeEditor.css               # Estilos do editor
│   ├── PreviewPane.jsx              # Preview iframe
│   ├── PreviewPane.css              # Estilos preview
│   └── [Outros componentes...]
├── hooks/
│   ├── useEditorTabs.js             # Estado das abas
│   └── [Outros hooks...]
└── utils/
    ├── textStats.js
    ├── exportFunctions.js
    └── [Outros utilitários...]
```

---

## 💡 Dicas de Uso

1. **Markdown Editor**: Use os 3 modos de preview
   - Edit: Apenas editor
   - Split: Editor + preview lado a lado
   - Preview: Apenas preview

2. **HTML + CSS**: Escreva HTML à esquerda, CSS à direita, veja no preview

3. **Atalhos de Teclado**:
   - `Ctrl+N`: Novo documento
   - `Ctrl+S`: Salvar
   - `Ctrl+F`: Buscar
   - `Ctrl+H`: Histórico de versões
   - `Ctrl+R`: Análise de legibilidade
   - `Ctrl+D`: Dashboard

4. **Tema**: Alterne entre light e dark modes para melhor conforto visual

---

## 🔧 Customização

### Alterar Cores
Edite `App.css` e procure por:
```css
.app.light {
  background: linear-gradient(135deg, #4a7ba7 0%, #6fb1d9 50%, #8ec5f1 100%);
}

.app.dark {
  background: linear-gradient(135deg, #0f1623 0%, #1a2a47 50%, #2a3f5f 100%);
}
```

### Adicionar Novas Abas
1. Atualize `EditorTabs.jsx` com nova aba
2. Adicione state em `useEditorTabs.js`
3. Implemente novo componente editor
4. Adicione condicional de renderização em `MultiEditorContainer.jsx`

---

## 📦 Dependências Principais

- `react` & `react-dom`: UI framework
- `@uiw/react-md-editor`: Editor de markdown avançado
- `@uiw/react-markdown-editor`: Pré-processador markdown
- `mermaid`: Diagramas em markdown
- `chart.js`: Gráficos
- `html2pdf.js`: Exportação para PDF

---

## 🐛 Troubleshooting

### As abas de HTML/CSS não aparecem
- Verifique se `MultiEditorContainer.jsx` está sendo importado corretamente
- Verifique o console do navegador para erros de módulo
- Limpe o cache: `npm cache clean --force` e `npm install`

### Preview não atualiza
- Verifique se `PreviewPane.jsx` está recebendo props `htmlContent` e `cssContent`
- Confirme que o iframe tem sandbox="allow-same-origin allow-scripts"

### CSS não está aplicando
- Verifique se os arquivos `.css` estão sendo importados
- Limpe o build: `rm -rf dist` e `npm run build` novamente

---

## 📝 Notas de Desenvolvimento

- Todos os componentes usam `export default` para melhor compatibilidade
- Hooks customizados centralizados em `src/hooks/`
- CSS BEM naming convention para melhor organização
- Suporte para tema light/dark em todos os componentes

---

**Última Atualização**: 2024
**Versão**: 0.0.0
**Status**: Em Desenvolvimento 🚧
