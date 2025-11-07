import html2pdf from 'html2pdf.js';

/**
 * Exporta o conteúdo renderizado em HTML para PDF
 */
export const exportToPDF = (element, filename = 'documento') => {
  const options = {
    margin: [15, 10, 15, 10],
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  return html2pdf()
    .set(options)
    .from(element)
    .save();
};

/**
 * Converte markdown para HTML e baixa como arquivo .html
 */
export const exportToHTML = (htmlContent, filename = 'documento') => {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            color: #333;
        }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
        }
        pre code {
            background: none;
            padding: 0;
            color: #f8f8f2;
        }
        blockquote {
            border-left: 4px solid #667eea;
            margin: 0;
            padding-left: 16px;
            color: #666;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        table th {
            background-color: #667eea;
            color: white;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
        }
        h1 { font-size: 2em; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        a { color: #667eea; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

  const blob = new Blob([htmlTemplate], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copia o conteúdo HTML para a área de transferência
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message: 'Copiado para área de transferência!' };
  } catch (err) {
    return { success: false, message: 'Erro ao copiar' };
  }
};

/**
 * Gera timestamp para nome de arquivo único
 */
export const generateFilename = (prefix = 'documento') => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `${prefix}_${date}_${time}`;
};
