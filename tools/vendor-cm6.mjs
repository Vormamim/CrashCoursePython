// Vendors CodeMirror 6 as plain ES modules (no bundler needed).
// Crawls jsDelivr's pre-built "+esm" modules and rewrites imports to local files.
// Run from the repo root: node tools/vendor-cm6.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ENTRIES = {
  'state': '@codemirror/state@6.5.2',
  'view': '@codemirror/view@6.36.5',
  'commands': '@codemirror/commands@6.8.1',
  'language': '@codemirror/language@6.11.0',
  'lang-python': '@codemirror/lang-python@6.2.1',
};
const OUT = 'app/vendor/codemirror';
const HOST = 'https://cdn.jsdelivr.net';
mkdirSync(OUT, { recursive: true });

const fileFor = new Map();   // remote path -> local file name
const pkgFile = new Map();   // package name -> local file (ONE version per package: CM6 breaks with duplicates)
const queue = [];
const pkgOf = p => p.replace(/^\/npm\//, '').replace(/\/\+esm$/, '').replace(/@[^@/]+$/, '');
const nameFor = p => pkgOf(p).replace(/[@/]/g, '_') + '.js';
function add(p) {
  const pkg = pkgOf(p);
  if (pkgFile.has(pkg)) return pkgFile.get(pkg);
  const name = nameFor(p);
  pkgFile.set(pkg, name); fileFor.set(p, name); queue.push(p);
  return name;
}

const fetchText = p => execFileSync('curl', ['-sSfL', HOST + p], { encoding: 'utf8', maxBuffer: 64e6 });

for (const [alias, spec] of Object.entries(ENTRIES)) {
  const p = `/npm/${spec}/+esm`;
  pkgFile.set(pkgOf(p), alias + '.js'); fileFor.set(p, alias + '.js'); queue.push(p);
}

while (queue.length) {
  const p = queue.shift();
  let src = fetchText(p);
  // import/export ... from "/npm/..."  and bare side-effect imports
  src = src.replace(/(from\s*|import\s*)(["'])(\/npm\/[^"']+)\2/g, (m, kw, q, target) => `${kw}${q}./${add(target)}${q}`);
  if (/https?:\/\/cdn\.jsdelivr\.net/.test(src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, ''))) console.warn('WARN absolute URL left in', p);
  writeFileSync(`${OUT}/${fileFor.get(p)}`, src);
}
console.log([...fileFor.values()].join('\n'));
