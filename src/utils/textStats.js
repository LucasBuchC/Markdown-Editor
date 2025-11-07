export const calculateStats = (text) => {
  if (!text) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      readTime: 0,
      lines: 0
    };
  }

  // Contagem de palavras
  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // Contagem de caracteres
  const characters = text.length;

  // Caracteres sem espaços
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Tempo de leitura (200 palavras por minuto)
  const readTime = Math.ceil(words / 200);

  // Número de linhas
  const lines = text.split('\n').length;

  return {
    words,
    characters,
    charactersNoSpaces,
    readTime,
    lines
  };
};
