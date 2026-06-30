// ide.js – interactive IDE logic
// Handles: Pyodide runtime, lesson navigation, progress persistence,
// and RUN / RESET / COPY / LOAD / SAVE actions.

// ── DOM references ────────────────────────────────────────
const editor    = document.getElementById("editor");
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
  renderNav();
  openLessonModal(lesson);
}

// ── Track edits → persist code + mark in-progress ─────────
editor.addEventListener("input", () => {
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
    // Capture any stdout that printed before the error
    try {
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      if (stdout) appendOutput(stdout, "out-stdout");
    } catch { /* ignore secondary error */ }

    appendOutput(String(err) + "\n", "out-error");

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
  }
  initPyodide();
}());
