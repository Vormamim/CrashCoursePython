# Vendored libraries

Copied into the repo so the site makes no third-party requests at runtime.

| Library | Version | Source | Licence |
|---|---|---|---|
| Pyodide (core only) | 0.26.2 (Python 3.12.1) | https://cdn.jsdelivr.net/pyodide/v0.26.2/full/ | MPL-2.0 |
| JSZip | 3.10.1 | https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js | MIT or GPL-3.0 |
| Space Grotesk (woff2, latin) | via @fontsource | `/shared/fonts/` | SIL OFL 1.1 |
| IBM Plex Mono (woff2, latin) | via @fontsource | `/shared/fonts/` | SIL OFL 1.1 |

Pyodide files: `pyodide.js`, `pyodide.mjs`, `pyodide.asm.js`, `pyodide.asm.wasm`, `python_stdlib.zip`, `pyodide-lock.json`. No Pyodide packages are vendored.

CodeMirror 6 (state, view, commands, language, lang-python plus Lezer and helper packages) is generated into `app/vendor/codemirror/` by `node tools/vendor-cm6.mjs`. The script keeps one copy of each package, because CodeMirror breaks if two copies of `@codemirror/state` load. Licence: MIT.
