/**
 * Análise de Readabilidade - Flesch-Kincaid
 */
export const calculateReadability = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const syllables = countSyllables(text);

  if (words === 0 || sentences === 0) return { grade: 0, difficulty: 'N/A' };

  // Fórmula Flesch-Kincaid Grade Level
  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
  const gradeLevel = Math.max(0, Math.round(grade * 10) / 10);

  let difficulty = 'Muito Fácil';
  if (gradeLevel > 9) difficulty = 'Fácil';
  if (gradeLevel > 12) difficulty = 'Intermediário';
  if (gradeLevel > 14) difficulty = 'Difícil';
  if (gradeLevel > 16) difficulty = 'Muito Difícil';

  return {
    grade: gradeLevel,
    difficulty,
    words,
    sentences,
    syllables
  };
};

const countSyllables = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  let totalSyllables = 0;

  words.forEach(word => {
    word = word.replace(/[^a-z]/g, '');
    if (word.length <= 3) {
      totalSyllables += 1;
    } else {
      const vowels = word.match(/[aeiouy]/g) || [];
      totalSyllables += vowels.length;
    }
  });

  return Math.max(1, totalSyllables);
};

/**
 * Extração de Palavras-Chave
 */
export const extractKeywords = (text, limit = 15) => {
  const stopWords = new Set([
    'a', 'o', 'e', 'é', 'de', 'da', 'do', 'para', 'com', 'em', 'na', 'no', 'os', 'as',
    'um', 'uma', 'uns', 'umas', 'por', 'ou', 'se', 'não', 'como', 'mais', 'muito',
    'que', 'seu', 'sua', 'este', 'esse', 'aquele', 'foi', 'são', 'ser', 'está'
  ]);

  const words = text
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 3 && !stopWords.has(w));

  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, freq]) => ({ word, frequency: freq }));
};

/**
 * Gerar dados para Wordcloud
 */
export const generateWordcloudData = (text) => {
  const keywords = extractKeywords(text, 30);
  const maxFreq = Math.max(...keywords.map(k => k.frequency));

  return keywords.map(k => ({
    text: k.word,
    value: (k.frequency / maxFreq) * 100,
    frequency: k.frequency
  }));
};

/**
 * Converter imagem para Base64
 */
export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Snippets de Abreviações
 */
export const DEFAULT_SNIPPETS = {
  ';;h1': '# ',
  ';;h2': '## ',
  ';;h3': '### ',
  ';;b': '**',
  ';;i': '*',
  ';;code': '``````',
  ';;table': '| Col1 | Col2 |\n|------|------|\n| A | B |',
  ';;link': '[texto](url)',
  ';;img': '![alt](url)',
  ';;quote': '> ',
  ';;list': '- ',
  ';;checkbox': '- [ ] ',
  ';;mermaid': '``````'
};

/**
 * Expandir Snippets
 */
export const expandSnippet = (text, snippets = DEFAULT_SNIPPETS) => {
  let expanded = text;
  Object.entries(snippets).forEach(([shortcut, expansion]) => {
    expanded = expanded.replace(new RegExp(shortcut + '\\b', 'g'), expansion);
  });
  return expanded;
};

/**
 * Detectar e validar código Mermaid
 */
export const extractMermaidDiagrams = (markdown) => {
  const mermaidRegex = /``````/g;
  const diagrams = [];
  let match;

  while ((match = mermaidRegex.exec(markdown)) !== null) {
    diagrams.push({
      id: `mermaid-${diagrams.length}`,
      code: match[1]
    });
  }

  return diagrams;
};

/**
 * Validar sintaxe Mermaid básica
 */
export const validateMermaidSyntax = (code) => {
  try {
    // Verificações básicas
    if (!code.trim()) return false;
    
    const diagramTypes = ['graph', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'gitGraph'];
    const isValidType = diagramTypes.some(type => code.includes(type));
    
    return isValidType;
  } catch (error) {
    return false;
  }
};

/**
 * Detectar equações LaTeX
 */
export const extractLatexEquations = (markdown) => {
  const inlineRegex = /\$([^\$]+)\$/g;
  const blockRegex = /\$\$([^\$]*)\$\$/g;
  
  const inline = [];
  const block = [];
  let match;

  while ((match = inlineRegex.exec(markdown)) !== null) {
    inline.push(match[1]);
  }

  while ((match = blockRegex.exec(markdown)) !== null) {
    block.push(match[1]);
  }

  return { inline, block };
};
