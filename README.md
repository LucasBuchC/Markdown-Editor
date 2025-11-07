# 📝 Advanced Markdown & Code Editor

Uma aplicação moderna e poderosa de edição com suporte multi-formato: **Markdown**, **HTML** e **CSS** com visualização em tempo real.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Recursos Principais

### 🎯 **Editor Multi-Aba**
- **Markdown Editor**: Editor completo com 3 modos de preview (Edit, Split, Preview)
- **HTML Editor**: Editor de código HTML com sintaxe destacada
- **CSS Editor**: Editor de código CSS com sintaxe destacada
- **Preview Ao Vivo**: Visualize HTML + CSS combinados em tempo real

### 🎨 **Design Moderno**
- ✅ Tema Light/Dark com gradiente azul suave
- ✅ Interface responsiva (Desktop, Tablet, Mobile)
- ✅ Animações suaves e feedback visual
- ✅ Acessibilidade otimizada (WCAG)

### 📊 **Análise e Estatísticas**
- 📈 Contagem de palavras e caracteres
- 📋 Contagem de linhas
- ⏱️ Tempo estimado de leitura
- 🔄 Auto-save automático

### 🚀 **Recursos Avançados**
- 📚 Historiador de versões com timeline
- 📋 Templates predefinidos
- 🔗 Sincronização com GitHub Gist
- 📊 Análise de legibilidade
- 🏷️ Nuvem de palavras-chave
- 📈 Dashboard com análises
- 📑 Tabela de conteúdos automática
- 🔍 Buscar e Substituir

### 💾 **Exportação**
- 📄 Exportar como PDF
- 🌐 Exportar como HTML
- 💾 Download em Markdown
- 📱 Suporte multi-formato

---

## 🛠️ Instalação

### Pré-requisitos
- Node.js >= 16.x
- npm >= 8.x

### Setup Inicial

```bash
# Clone o repositório
git clone <seu-repositorio>
cd markdown-editor

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5174/` no seu navegador.

---

## 📦 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar preview do build
npm run preview

# Análise do bundle
npm run analyze
```

---

## 🏗️ Estrutura do Projeto

```
markdown-editor/
├── public/                      # Arquivos estáticos
├── src/
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globais + multi-editor
│   ├── index.html              # HTML template
│   │
│   ├── components/
│   │   └── Features/
│   │       ├── MultiEditorContainer.jsx        # Container multi-editor
│   │       ├── MultiEditorContainer.css        # Estilos container
│   │       ├── EditorTabs.jsx                  # Navegação de abas
│   │       ├── EditorTabs.css                  # Estilos abas
│   │       ├── CodeEditor.jsx                  # Editor de código
│   │       ├── CodeEditor.css                  # Estilos editor
│   │       ├── PreviewPane.jsx                 # Preview iframe
│   │       ├── PreviewPane.css                 # Estilos preview
│   │       └── [Outros componentes...]
│   │
│   ├── hooks/
│   │   ├── useEditorTabs.js    # Estado das abas
│   │   ├── useMarkdown.js      # Lógica markdown
│   │   ├── useDocuments.js     # Gerenciamento de documentos
│   │   └── [Outros hooks...]
│   │
│   └── utils/
│       ├── textStats.js        # Cálculo de estatísticas
│       ├── exportFunctions.js  # Funções de exportação
│       └── [Outros utilitários...]
│
├── vite.config.js              # Configuração Vite
├── eslint.config.js            # ESLint configuration
├── package.json                # Dependências
├── FEATURES.md                 # Documentação de features
└── README.md                   # Este arquivo
```

---

## 🎨 Personalização

### Alterar Cores do Tema

Edite `src/App.css`:

```css
/* Light Mode */
.app.light {
  background: linear-gradient(135deg, #4a7ba7 0%, #6fb1d9 50%, #8ec5f1 100%);
  color: #1a1a1a;
}

/* Dark Mode */
.app.dark {
  background: linear-gradient(135deg, #0f1623 0%, #1a2a47 50%, #2a3f5f 100%);
  color: #e8f0fe;
}
```

### Adicionar Novo Componente

1. Crie o arquivo em `src/components/Features/`
2. Implemente o componente com `export default`
3. Importe em `MultiEditorContainer.jsx`
4. Adicione a aba em `EditorTabs.jsx`

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl+N` | Novo documento |
| `Ctrl+S` | Salvar documento |
| `Ctrl+F` | Buscar |
| `Ctrl+H` | Histórico de versões |
| `Ctrl+R` | Análise de legibilidade |
| `Ctrl+D` | Dashboard |

---

## 📱 Responsividade

| Tipo | Tamanho | Otimizações |
|------|---------|------------|
| Desktop | 1200px+ | Layout 2 colunas, split-pane completo |
| Tablet | 768px - 1024px | Layout ajustado, preview mobile |
| Mobile | < 480px | Layout 1 coluna, abas otimizadas |

---

## 📚 Dependências Principais

```json
{
  "@uiw/react-md-editor": "^4.0.8",  // Editor markdown avançado
  "react": "^19.1.1",                 // React framework
  "vite": "^7.1.7",                   // Build tool
  "chart.js": "^4.5.1",              // Gráficos
  "mermaid": "^11.12.1",             // Diagramas
  "html2pdf.js": "^0.12.1"           // Exportação PDF
}
```

---

## 🐛 Troubleshooting

### As abas HTML/CSS não aparecem

```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Preview não atualiza

1. Verifique se `PreviewPane.jsx` está recebendo props
2. Abra o console do navegador (F12) para erros
3. Verifique se o iframe tem `sandbox="allow-same-origin allow-scripts"`

### CSS não está aplicando

```bash
# Limpe o build
rm -rf dist

# Rebuilde
npm run build
```

---

## 🚀 Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm run build
# Copie o conteúdo de `dist/` para a branch `gh-pages`
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5174
CMD ["npm", "run", "preview"]
```

---

## 📝 Exemplos de Uso

### Markdown Editor
```markdown
# Olá Mundo

Este é um editor **markdown** completo com:
- Suporte a sintaxe GFM
- Diagramas Mermaid
- Equações LaTeX
- Tabelas e listas
```

### HTML + CSS
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    h1 { color: #4a7ba7; }
  </style>
</head>
<body>
  <h1>Olá Mundo</h1>
</body>
</html>
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 🙋 Suporte

Se encontrou um problema ou tem uma sugestão, abra uma [issue](https://github.com/seu-usuario/markdown-editor/issues).

---

**Desenvolvido com ❤️ usando React + Vite**

Última atualização: 2024
Versão: 0.0.0
