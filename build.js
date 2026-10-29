/**
 * build.js — injeta perguntas.json no index.html
 * Uso: node build.js
 * Gera: index.html com as perguntas embutidas (funciona sem servidor)
 */

const fs   = require('fs');
const path = require('path');

const DIR       = __dirname;
const JSON_FILE = path.join(DIR, 'perguntas.json');
const HTML_FILE = path.join(DIR, 'index.html');

// Lê o JSON
let data;
try {
  data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
} catch (e) {
  console.error('Erro ao ler perguntas.json:', e.message);
  process.exit(1);
}

// Monta objeto perguntas { categoria: [{id, pergunta}] }
const perguntas = {};
for (const [key, val] of Object.entries(data.categorias)) {
  perguntas[key] = val.perguntas || [];
}
// garante que sorte exista
if (!perguntas.sorte) perguntas.sorte = [];

const injetado = JSON.stringify(perguntas);

// Lê o HTML
let html = fs.readFileSync(HTML_FILE, 'utf8');

// Substitui o bloco PERGUNTAS_FALLBACK com os dados reais
// Marcador: // @PERGUNTAS_START ... // @PERGUNTAS_END
const MARKER_START = '// @PERGUNTAS_START';
const MARKER_END   = '// @PERGUNTAS_END';

const novoBloco = `${MARKER_START}
const PERGUNTAS_FALLBACK = ${injetado};
${MARKER_END}`;

if (html.includes(MARKER_START) && html.includes(MARKER_END)) {
  // Substitui bloco existente
  const re = new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`, 'g');
  html = html.replace(re, novoBloco);
} else {
  // Primeira vez: substitui a declaração antiga de PERGUNTAS_FALLBACK
  const re = /const PERGUNTAS_FALLBACK\s*=\s*\{[\s\S]*?\};\s*\n/;
  if (!re.test(html)) {
    console.error('Não encontrei PERGUNTAS_FALLBACK no index.html.');
    process.exit(1);
  }
  html = html.replace(re, novoBloco + '\n');
}

fs.writeFileSync(HTML_FILE, html, 'utf8');
console.log(`✅ Perguntas injetadas com sucesso!`);
for (const [key, arr] of Object.entries(perguntas)) {
  if (arr.length) console.log(`   ${key}: ${arr.length} perguntas`);
}
console.log('\nAbra o index.html no navegador — funciona sem servidor.');
