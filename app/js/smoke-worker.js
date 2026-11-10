/* Smoke-test worker: loads the vendored Pyodide and runs one line of Python. */
self.onmessage = async () => {
  try {
    const t0 = performance.now();
    importScripts('../vendor/pyodide/pyodide.js');
    const pyodide = await self.loadPyodide({ indexURL: new URL('../vendor/pyodide/', self.location.href).href });
    const loadMs = Math.round(performance.now() - t0);
    const out = pyodide.runPython('import sys\nf"Python {sys.version.split()[0]}: 6 * 7 = {6 * 7}"');
    self.postMessage({ ok: true, out, loadMs });
  } catch (err) {
    self.postMessage({ ok: false, error: String(err && err.message || err) });
  }
};
