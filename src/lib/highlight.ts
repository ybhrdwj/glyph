import * as shiki from 'shiki';

export async function highlightCode(code: string, language: string) {
  const highlighter = await shiki.createHighlighter({
    themes: ['poimandres'],
    langs: ['typescript', 'tsx'],
  });

  const highlighted = highlighter.codeToHtml(code, {
    lang: language,
    theme: 'poimandres',
  });

  return highlighted
    .replace('<pre class="', '<pre class="p-4 sm:p-6 whitespace-pre-wrap break-words ')
    .replace('<code>', '<code class="whitespace-pre-wrap">');
} 