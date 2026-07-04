// ide.js – interactive IDE logic
// Handles: Pyodide runtime, lesson navigation, progress persistence,
// and RUN / RESET / COPY / LOAD / SAVE actions.

// ── DOM references ────────────────────────────────────────
const editor    = document.getElementById("editor");
const editorGutter = document.getElementById("editor-gutter");
const output    = document.getElementById("output");
const btnRun    = document.getElementById("btn-run");
const btnReset  = document.getElementById("btn-reset");
const btnCopy   = document.getElementById("btn-copy");
const btnLoad   = document.getElementById("btn-load");
const btnSave   = document.getElementById("btn-save");
const fileInput = document.getElementById("file-input");
const statusMsg = document.getElementById("status-msg");
const navRow    = document.getElementById("row-nav");
const lessonModal = document.getElementById("lesson-modal");
const lessonModalTitle = document.getElementById("lesson-modal-title");
const lessonModalGoal = document.getElementById("lesson-modal-goal");
const lessonModalStory = document.getElementById("lesson-modal-story");
const lessonModalTags = document.getElementById("lesson-modal-tags");
const btnModalClose = document.getElementById("btn-modal-close");
const btnModalStart = document.getElementById("btn-modal-start");

// ── Runtime state ─────────────────────────────────────────
let pyodide = null;          // set once Pyodide is loaded
let currentLessonId = null;  // id of the active lesson

// ── Output helpers ────────────────────────────────────────

/** Append a span of text to the output panel with an optional CSS class. */
function appendOutput(text, cls) {
  const span = document.createElement("span");
  if (cls) span.className = cls;
  span.textContent = text;
  output.appendChild(span);
  // Auto-scroll to bottom
  output.scrollTop = output.scrollHeight;
}

function clearOutput() {
  output.textContent = "";
}

// ── Line-number gutter ────────────────────────────────────

/** Rebuild the gutter's line numbers to match the editor's current line count. */
function renderGutter() {
  if (!editorGutter) return;
  const lineCount = editor.value.split("\n").length;
  let html = "";
  for (let i = 1; i <= lineCount; i++) {
    html += `<div class="gutter-line" data-line="${i}">${i}</div>`;
  }
  editorGutter.innerHTML = html;
  syncGutterScroll();
}

/** Keep the gutter's scroll position matched to the editor's. */
function syncGutterScroll() {
  if (!editorGutter) return;
  editorGutter.scrollTop = editor.scrollTop;
}

/** Highlight the gutter entry for the line a Python error occurred on. */
function highlightErrorLine(lineNumber) {
  if (!editorGutter) return;
  clearErrorLine();
  const el = editorGutter.querySelector(`.gutter-line[data-line="${lineNumber}"]`);
  if (el) el.classList.add("is-error-line");
}

/** Clear any previously highlighted error line in the gutter. */
function clearErrorLine() {
  if (!editorGutter) return;
  const prev = editorGutter.querySelector(".is-error-line");
  if (prev) prev.classList.remove("is-error-line");
}

/** Extract the last "line N" reference from a Python traceback string. */
function findErrorLine(errText) {
  const matches = [...errText.matchAll(/line (\d+)/g)];
  if (!matches.length) return null;
  return parseInt(matches[matches.length - 1][1], 10);
}

editor.addEventListener("scroll", syncGutterScroll);

// ── Progress (localStorage) ───────────────────────────────

const PROGRESS_KEY = "ide-progress";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
}

function setLessonStatus(id, status) {
  const prog = getProgress();
  prog[id] = status;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(prog));
}

function getLessonStatus(id) {
  return getProgress()[id] || "not-started";
}

function getRequestedLessonId() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lesson");
  if (!requested) return null;
  return LESSONS.some(lesson => lesson.id === requested) ? requested : null;
}

function getLessonTags(lesson) {
  const summaryTags = {
    "lesson-01": ["variables", "types", "output"],
    "lesson-02": ["input", "conversion", "math"],
    "lesson-03": ["branching", "logic", "nested if"],
    "lesson-04": ["lists", "tuples", "indexes"],
    "lesson-05": ["debugging", "trace tables", "conditions"],
    "lesson-06": ["planning", "testing", "reflection"],
    "lesson-07": ["for loops", "range()", "patterns"],
    "lesson-08": ["while loops", "counters", "safety"],
    "lesson-09": ["validation", "mixed loops", "testing"],
    "lesson-10": ["capstone", "AI safety", "summaries"]
  };

  return summaryTags[lesson.id] || [];
}

function renderLessonModal(lesson) {
  lessonModalTitle.textContent = lesson.title;
  lessonModalGoal.textContent = lesson.goal;
  lessonModalStory.textContent = lesson.story;
  lessonModalTags.innerHTML = "";

  getLessonTags(lesson).forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    lessonModalTags.appendChild(span);
  });
}

function openLessonModal(lesson) {
  if (!lessonModal || !lesson) return;
  renderLessonModal(lesson);
  lessonModal.classList.add("is-open");
  lessonModal.setAttribute("aria-hidden", "false");
}

function closeLessonModal() {
  if (!lessonModal) return;
  lessonModal.classList.remove("is-open");
  lessonModal.setAttribute("aria-hidden", "true");
  editor.focus();
}

// ── Lesson navigation ─────────────────────────────────────

/** Map a lesson status string to a Bootstrap button variant. */
function statusVariant(status) {
  if (status === "complete")    return "btn-success";
  if (status === "in-progress") return "btn-warning";
  return "btn-outline-secondary";
}

/** Re-render all lesson buttons in the nav row. */
function renderNav() {
  navRow.innerHTML = "";

  LESSONS.forEach(lesson => {
    const status = getLessonStatus(lesson.id);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = lesson.title;
    btn.dataset.lessonId = lesson.id;
    btn.className = "btn btn-sm lesson-nav-btn " + statusVariant(status);
    if (lesson.id === currentLessonId) btn.classList.add("active");
    btn.addEventListener("click", () => selectLesson(lesson.id));
    navRow.appendChild(btn);
  });

  // Legend for status colours
  const legend = document.createElement("span");
  legend.className = "nav-legend";
  legend.innerHTML =
    '<span class="badge bg-outline-secondary border border-secondary me-1">●</span>not started&nbsp;&nbsp;' +
    '<span class="badge bg-warning text-dark me-1">●</span>in progress&nbsp;&nbsp;' +
    '<span class="badge bg-success me-1">●</span>complete';
  navRow.appendChild(legend);
}

/**
 * Switch to the given lesson.
 * Restores previously saved code from localStorage, falling back to starter code.
 */
function selectLesson(id) {
  currentLessonId = id;
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;

  const saved = localStorage.getItem("ide-code-" + id);
  editor.value = saved !== null ? saved : lesson.starterCode;

  clearOutput();
  clearErrorLine();
  renderGutter();
  renderNav();
  openLessonModal(lesson);
}

// ── Editor indentation (Tab / auto-indent after ':') ───────
const INDENT = "    "; // 4 spaces, matches PEP 8

editor.addEventListener("keydown", e => {
  const { selectionStart: start, selectionEnd: end, value } = editor;

  if (e.key === "Tab") {
    e.preventDefault();

    if (e.shiftKey) {
      // Shift+Tab: remove up to one indent level from the start of the line
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineText = value.slice(lineStart, lineStart + INDENT.length);
      const removeLen = lineText === INDENT ? INDENT.length
        : (lineText.startsWith("\t") ? 1 : 0);
      if (removeLen > 0) {
        editor.value = value.slice(0, lineStart) + value.slice(lineStart + removeLen);
        editor.selectionStart = Math.max(lineStart, start - removeLen);
        editor.selectionEnd = Math.max(lineStart, end - removeLen);
      }
    } else {
      // Tab: insert an indent at the cursor (replacing any selection)
      editor.value = value.slice(0, start) + INDENT + value.slice(end);
      editor.selectionStart = editor.selectionEnd = start + INDENT.length;
    }
    editor.dispatchEvent(new Event("input"));
    return;
  }

  if (e.key === "Enter") {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const currentLine = value.slice(lineStart, start);
    const currentIndent = (currentLine.match(/^[ \t]*/) || [""])[0];

    // Add one extra indent level if the line (ignoring trailing
    // whitespace/comments) opens a new block, e.g. "if x == 5:"
    const codeOnly = currentLine.replace(/#.*$/, "").trimEnd();
    const extraIndent = codeOnly.endsWith(":") ? INDENT : "";

    e.preventDefault();
    const insertion = "\n" + currentIndent + extraIndent;
    editor.value = value.slice(0, start) + insertion + value.slice(end);
    editor.selectionStart = editor.selectionEnd = start + insertion.length;
    editor.dispatchEvent(new Event("input"));
  }
});

// ── Track edits → persist code + mark in-progress ─────────
editor.addEventListener("input", () => {
  renderGutter();
  clearErrorLine();

  if (!currentLessonId) return;
  localStorage.setItem("ide-code-" + currentLessonId, editor.value);

  // Transition from not-started to in-progress on first keystroke
  if (getLessonStatus(currentLessonId) === "not-started") {
    setLessonStatus(currentLessonId, "in-progress");
    renderNav();
  }
});

// ── RUN ───────────────────────────────────────────────────
btnRun.addEventListener("click", async () => {
  if (!pyodide) return;

  clearOutput();
  clearErrorLine();
  btnRun.disabled = true;
  statusMsg.textContent = "Running…";

  const code = editor.value;

  try {
    // Reset captured output buffers before each run
    pyodide.runPython(
      "import sys, io\n" +
      "sys.stdout = io.StringIO()\n" +
      "sys.stderr = io.StringIO()\n"
    );

    await pyodide.runPythonAsync(code);

    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    const stderr = pyodide.runPython("sys.stderr.getvalue()");

    if (stdout) appendOutput(stdout, "out-stdout");
    if (stderr) appendOutput(stderr, "out-error");
    if (!stdout && !stderr) appendOutput("(no output)\n", "out-info");

    // Mark lesson complete on a clean run
    if (currentLessonId) {
      setLessonStatus(currentLessonId, "complete");
      renderNav();
    }
  } catch (err) {
    // Capture any stdout that printed before the error. The traceback text
    // itself lands in the redirected sys.stderr buffer, not on `err`, so
    // that's the message we display (falling back to `err` if unavailable).
    let stderrText = "";
    try {
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      if (stdout) appendOutput(stdout, "out-stdout");
      stderrText = pyodide.runPython("sys.stderr.getvalue()");
    } catch { /* ignore secondary error */ }

    const errText = stderrText || String(err);
    const errLine = findErrorLine(errText);
    if (errLine !== null) {
      appendOutput(`⚠ Error on line ${errLine}\n`, "out-error-heading");
      highlightErrorLine(errLine);
    }
    appendOutput(errText + "\n", "out-error");

    // Ensure progress at least moves to in-progress
    if (currentLessonId && getLessonStatus(currentLessonId) === "not-started") {
      setLessonStatus(currentLessonId, "in-progress");
      renderNav();
    }
  } finally {
    btnRun.disabled = false;
    statusMsg.textContent = "Ready";
  }
});

// ── RESET ─────────────────────────────────────────────────
btnReset.addEventListener("click", () => {
  if (!currentLessonId) return;
  const lesson = LESSONS.find(l => l.id === currentLessonId);
  if (!lesson) return;
  editor.value = lesson.starterCode;
  localStorage.removeItem("ide-code-" + currentLessonId);
  clearOutput();
  clearErrorLine();
  renderGutter();
});

// ── COPY ──────────────────────────────────────────────────
btnCopy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(editor.value);
    const orig = btnCopy.textContent;
    btnCopy.textContent = "✓ Copied";
    setTimeout(() => { btnCopy.textContent = orig; }, 1500);
  } catch {
    // Fallback: select all text so the user can copy manually
    editor.focus();
    editor.select();
  }
});

// ── LOAD ──────────────────────────────────────────────────
btnLoad.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    editor.value = ev.target.result;
    clearErrorLine();
    renderGutter();
    if (currentLessonId) {
      localStorage.setItem("ide-code-" + currentLessonId, editor.value);
      if (getLessonStatus(currentLessonId) === "not-started") {
        setLessonStatus(currentLessonId, "in-progress");
        renderNav();
      }
    }
  };
  reader.readAsText(file);
  // Reset so the same file can be loaded again
  fileInput.value = "";
});

// ── SAVE ──────────────────────────────────────────────────
btnSave.addEventListener("click", () => {
  const filename = currentLessonId ? currentLessonId + ".py" : "code.py";
  const blob = new Blob([editor.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// ── Lesson modal controls ────────────────────────────────
if (btnModalClose) {
  btnModalClose.addEventListener("click", closeLessonModal);
}

if (btnModalStart) {
  btnModalStart.addEventListener("click", closeLessonModal);
}

if (lessonModal) {
  lessonModal.addEventListener("click", event => {
    if (event.target === lessonModal) {
      closeLessonModal();
    }
  });
}

// ── Pyodide initialisation ────────────────────────────────
async function initPyodide() {
  statusMsg.textContent = "Loading Python runtime…";
  btnRun.disabled = true;

  try {
    pyodide = await loadPyodide();

    // Override Python's built-in input() with browser prompt().
    // This allows lessons that call input() to work in the browser.
    pyodide.runPython(
      "import builtins\n" +
      "import js\n" +
      "builtins.input = lambda prompt='': js.window.prompt(str(prompt)) or ''\n"
    );

    statusMsg.textContent = "Ready";
    btnRun.disabled = false;
  } catch (err) {
    statusMsg.textContent = "Failed to load Python runtime.";
    console.error("Pyodide load error:", err);
  }
}

// ── Entry point ───────────────────────────────────────────
(function init() {
  if (LESSONS.length > 0) {
    selectLesson(getRequestedLessonId() || LESSONS[0].id);
  } else {
    renderGutter();
  }
  initPyodide();
}());
