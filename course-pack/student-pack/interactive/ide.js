// ide.js – interactive IDE logic
// Handles: Pyodide runtime, lesson navigation, progress persistence,
// and RUN / RESET / COPY / LOAD / SAVE actions.

// ── DOM references ────────────────────────────────────────
// `editor` becomes the CodeMirror instance once initializeEditor() runs
// (called from the entry point, before any lesson is selected) — real
// Python syntax highlighting instead of a flat-colour textarea, same
// setup as LoFiPy's proven python-ide-pyodide.js.
let editor = null;
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
const theoryPanel = document.getElementById("theory-panel");
const theoryPanelTitle = document.getElementById("theory-panel-title");
const theoryPanelBody = document.getElementById("theory-panel-body");
const btnTheory = document.getElementById("btn-theory");
const btnTheoryClose = document.getElementById("btn-theory-close");
const inputModal = document.getElementById("input-modal");
const inputModalTitle = document.getElementById("input-modal-title");
const inputModalPrompt = document.getElementById("input-modal-prompt");
const inputModalField = document.getElementById("input-modal-field");
const btnInputSubmit = document.getElementById("btn-input-submit");
const btnInputCancel = document.getElementById("btn-input-cancel");
const rowResizeHandle = document.getElementById("row-resize-handle");
const ideApp = document.getElementById("ide-app");

// ── Dark/Light toggle ────────────────────────────────────
// GitHub's own dark/light palette drives the neutral chrome (see the
// --gh-* tokens in ide.css); brand accent colours are untouched by this
// toggle. The Bootswatch stylesheet itself is swapped between Darkly and
// Flatly so buttons/badges stay polished in both modes. Sits right next
// to the Theory button in #editor-toolbar — inserted once below, since
// (unlike #row-nav) that toolbar is never rebuilt/cleared.
const THEME_STORAGE_KEY = "pyadv-theme";
const bsThemeLink = document.getElementById("bs-theme-css");

const themeToggle = document.createElement("button");
themeToggle.type = "button";
themeToggle.id = "theme-toggle";
themeToggle.className = "btn btn-sm btn-outline-secondary theme-toggle";
if (btnTheory) btnTheory.insertAdjacentElement("afterend", themeToggle);

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (bsThemeLink) {
    const variant = theme === "light" ? "flatly" : "darkly";
    bsThemeLink.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.2/dist/${variant}/bootstrap.min.css`;
  }
  // CodeMirror doesn't exist yet on the very first call (applied before
  // initializeEditor() runs) — selectLesson()/initializeEditor() apply it
  // again once the instance is created.
  if (editor) editor.setOption("theme", theme === "light" ? "eclipse" : "monokai");
  themeToggle.textContent = theme === "light" ? "Dark mode" : "Light mode";
  themeToggle.title = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
});

// ── Runtime state ─────────────────────────────────────────
let pyodide = null;          // set once Pyodide is loaded
let currentLessonId = null;  // id of the active lesson
let saveSerial = 1;          // disambiguates same-second saves, see generateDefaultFilename()

// Resolves whichever #input-modal request (Python input() or the
// save-filename prompt) is currently open — see requestPythonInput() and
// promptForFilename(), and submitInput()/cancelInput() below.
let inputResolve = null;
let inputCancel = null;

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

/**
 * Copy text to the clipboard, briefly flashing the button label.
 * If the clipboard API is unavailable, falls back to selecting `fallbackEl`
 * (a visible DOM node containing the same text) so the user can copy
 * manually, or selecting the editor's own text if no `fallbackEl` is given.
 */
async function copyToClipboard(text, button, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const orig = button.textContent;
      button.textContent = "Copied";
      setTimeout(() => { button.textContent = orig; }, 1200);
    }
  } catch {
    if (fallbackEl) {
      const range = document.createRange();
      range.selectNodeContents(fallbackEl);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editor.focus();
      editor.execCommand("selectAll");
    }
  }
}

// ── Error-line highlighting ────────────────────────────────
// CodeMirror provides its own line-number gutter natively (lineNumbers:
// true in initializeEditor()) — the custom gutter div this used to sync
// against is gone. Error highlighting now uses CodeMirror's own
// addLineClass/removeLineClass, tracking the highlighted line's handle
// so it stays correct even if the student edits other lines above it.
let errorLineHandle = null;

/** Highlight the line a Python error occurred on. `lineNumber` is 1-indexed
 *  (as extracted from the traceback); CodeMirror lines are 0-indexed. */
function highlightErrorLine(lineNumber) {
  if (!editor) return;
  clearErrorLine();
  errorLineHandle = editor.getLineHandle(lineNumber - 1);
  if (errorLineHandle) editor.addLineClass(errorLineHandle, "background", "cm-error-line");
}

/** Clear any previously highlighted error line. */
function clearErrorLine() {
  if (!editor || !errorLineHandle) return;
  editor.removeLineClass(errorLineHandle, "background", "cm-error-line");
  errorLineHandle = null;
}

/** Extract the last "line N" reference from a Python traceback string. */
function findErrorLine(errText) {
  const matches = [...errText.matchAll(/line (\d+)/g)];
  if (!matches.length) return null;
  return parseInt(matches[matches.length - 1][1], 10);
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

// Separate, lightweight tracking for whether a student has engaged with a
// lesson's quiz — deliberately NOT a value of the not-started/in-progress/
// complete status above (which stays driven purely by a clean Run), just a
// visible nudge so the quiz isn't a no-op (instructional-design finding #4).
const THEORY_REVIEWED_KEY = "ide-theory-reviewed";

function getTheoryReviewed() {
  try {
    return JSON.parse(localStorage.getItem(THEORY_REVIEWED_KEY) || "{}");
  } catch {
    return {};
  }
}

function markTheoryReviewed(id) {
  const reviewed = getTheoryReviewed();
  if (reviewed[id]) return;
  reviewed[id] = true;
  localStorage.setItem(THEORY_REVIEWED_KEY, JSON.stringify(reviewed));
}

function isTheoryReviewed(id) {
  return !!getTheoryReviewed()[id];
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

// ── Theory panel controls ─────────────────────────────────

/** Build one read-only theory card (heading + explanation + sample code) for the panel body. */
function renderTheoryCard(item) {
  const card = document.createElement("div");
  card.className = "theory-card";

  const heading = document.createElement("h3");
  heading.textContent = item.heading;
  card.appendChild(heading);

  if (item.appliesTo) {
    const appliesTo = document.createElement("span");
    appliesTo.className = "theory-card__applies-to";
    appliesTo.textContent = "Applies to " + item.appliesTo;
    card.appendChild(appliesTo);
  }

  const explanation = document.createElement("p");
  explanation.textContent = item.explanation;
  card.appendChild(explanation);

  const head = document.createElement("div");
  head.className = "snippet-head";
  const label = document.createElement("span");
  label.textContent = "Sample";
  head.appendChild(label);
  card.appendChild(head);

  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = item.code;
  pre.appendChild(code);
  card.appendChild(pre);

  return card;
}

/** Build the "what to do" + "core idea" block that sits above the per-concept
 *  theory cards — task instructions in plain language plus the one big idea
 *  behind them, distinct from the modal's goal/story (scene-setting) and the
 *  theory cards' explanations (syntax detail). */
function renderTaskIntro(lesson) {
  const intro = lesson.taskIntro;
  if (!intro) return null;

  const wrap = document.createElement("div");
  wrap.className = "task-intro";

  if (intro.whatToDo) {
    const label1 = document.createElement("p");
    label1.className = "task-intro__label";
    label1.textContent = "What to do";
    wrap.appendChild(label1);

    const whatToDo = document.createElement("p");
    whatToDo.className = "task-intro__text";
    whatToDo.textContent = intro.whatToDo;
    wrap.appendChild(whatToDo);
  }

  if (intro.coreIdea) {
    const label2 = document.createElement("p");
    label2.className = "task-intro__label";
    label2.textContent = "Core idea";
    wrap.appendChild(label2);

    const coreIdea = document.createElement("p");
    coreIdea.className = "task-intro__text";
    coreIdea.textContent = intro.coreIdea;
    wrap.appendChild(coreIdea);
  }

  return wrap;
}

/** Rebuild the theory panel's content for the given lesson. */
function renderTheoryPanel(lesson) {
  if (!theoryPanel) return;
  theoryPanelTitle.textContent = lesson.title;
  theoryPanelBody.innerHTML = "";

  const taskIntro = renderTaskIntro(lesson);
  if (taskIntro) theoryPanelBody.appendChild(taskIntro);

  const theory = lesson.theory || [];
  if (theory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "theory-panel__empty";
    empty.textContent = "No theory notes for this lesson yet.";
    theoryPanelBody.appendChild(empty);
  } else {
    theory.forEach(item => theoryPanelBody.appendChild(renderTheoryCard(item)));
  }

  renderQuizSection(lesson);
}

/** Build one multiple-choice quiz question (prompt + option buttons + feedback line). */
function renderQuizQuestion(q, index, lessonId) {
  const wrap = document.createElement("div");
  wrap.className = "quiz-question";

  const prompt = document.createElement("p");
  prompt.className = "quiz-question__prompt";
  prompt.textContent = `${index + 1}. ${q.question}`;
  wrap.appendChild(prompt);

  const optionsWrap = document.createElement("div");
  optionsWrap.className = "quiz-options";
  wrap.appendChild(optionsWrap);

  const feedback = document.createElement("p");
  feedback.className = "quiz-feedback";
  feedback.setAttribute("aria-live", "polite");
  wrap.appendChild(feedback);

  q.options.forEach((optionText, optionIndex) => {
    const optionBtn = document.createElement("button");
    optionBtn.type = "button";
    optionBtn.className = "quiz-option";
    optionBtn.textContent = optionText;

    optionBtn.addEventListener("click", () => {
      if (optionIndex === q.correctIndex) {
        optionBtn.classList.add("is-correct");
        feedback.textContent = "Correct!";
        feedback.className = "quiz-feedback quiz-feedback--correct";
        optionsWrap.querySelectorAll(".quiz-option").forEach(btn => { btn.disabled = true; });
        if (!isTheoryReviewed(lessonId)) {
          markTheoryReviewed(lessonId);
          renderNav();
        }
      } else {
        optionBtn.classList.add("is-incorrect");
        feedback.textContent = "Not quite — try another option.";
        feedback.className = "quiz-feedback quiz-feedback--incorrect";
      }
    });

    optionsWrap.appendChild(optionBtn);
  });

  return wrap;
}

/** Append the "Check your understanding" quiz section for the given lesson, if it has quiz content. */
function renderQuizSection(lesson) {
  const quiz = lesson.quiz || [];
  if (quiz.length === 0) return;

  const section = document.createElement("div");
  section.className = "quiz-section";

  const heading = document.createElement("h3");
  heading.className = "quiz-section__title";
  heading.textContent = "Check your understanding";
  section.appendChild(heading);

  quiz.forEach((q, index) => section.appendChild(renderQuizQuestion(q, index, lesson.id)));

  theoryPanelBody.appendChild(section);
}

/** Keep the panel's top edge below #row-nav, which wraps to multiple lines
 *  at some widths, so the drawer never covers lesson nav buttons. */
function positionTheoryPanel() {
  if (!theoryPanel || !navRow) return;
  theoryPanel.style.top = navRow.getBoundingClientRect().bottom + "px";
}

function openTheoryPanel() {
  if (!theoryPanel) return;
  positionTheoryPanel();
  theoryPanel.classList.add("is-open");
  theoryPanel.setAttribute("aria-hidden", "false");
  if (btnTheory) btnTheory.setAttribute("aria-expanded", "true");
}

function closeTheoryPanel() {
  if (!theoryPanel) return;
  theoryPanel.classList.remove("is-open");
  theoryPanel.setAttribute("aria-hidden", "true");
  if (btnTheory) btnTheory.setAttribute("aria-expanded", "false");
  editor.focus();
}

function toggleTheoryPanel() {
  if (!theoryPanel) return;
  if (theoryPanel.classList.contains("is-open")) {
    closeTheoryPanel();
  } else {
    openTheoryPanel();
  }
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
    btn.textContent = lesson.title + (isTheoryReviewed(lesson.id) ? " ✓" : "");
    if (isTheoryReviewed(lesson.id)) btn.title = "Theory reviewed";
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
    '<span class="badge bg-success me-1">●</span>complete&nbsp;&nbsp;' +
    '<span class="me-1">✓</span>theory reviewed';
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
  editor.setValue(saved !== null ? saved : lesson.starterCode);

  clearOutput();
  clearErrorLine();
  renderNav();
  renderTheoryPanel(lesson);
  // Default the theory panel open on every lesson load — closed-by-default
  // meant most students never noticed it was there.
  openTheoryPanel();
  openLessonModal(lesson);
}

/** Creates the CodeMirror instance from the #editor textarea — real Python
 *  syntax highlighting, matching LoFiPy's already-proven setup exactly
 *  (python-ide-pyodide.js's initializeEditor()). Called once from the
 *  entry point, before any lesson is selected. */
function initializeEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "python",
    theme: "monokai",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Enter": () => btnRun.click() },
  });
  editor.on("change", handleEditorChange);
}

// ── Track edits → persist code + mark in-progress ─────────
// Wired to CodeMirror's 'change' event inside initializeEditor() — Tab/
// Shift-Tab/Enter indentation is handled natively by CodeMirror's Python
// mode (indentUnit/tabSize/indentWithTabs, set above), so the custom
// keydown handler this used to need is gone.
function handleEditorChange(cm, changeObj) {
  clearErrorLine();

  if (!currentLessonId) return;
  localStorage.setItem("ide-code-" + currentLessonId, editor.getValue());

  // Transition from not-started to in-progress on first keystroke
  if (getLessonStatus(currentLessonId) === "not-started") {
    setLessonStatus(currentLessonId, "in-progress");
    renderNav();
  }

  // Auto-close the theory panel on the student's first real keystroke — it
  // auto-opens on lesson load for discovery, but must not block the editor
  // once they start working. changeObj.origin is "setValue" for the
  // programmatic setValue() calls in selectLesson()/Reset/Load, so those
  // don't trigger this — only actual typing does.
  if (changeObj && changeObj.origin !== "setValue" && theoryPanel && theoryPanel.classList.contains("is-open")) {
    closeTheoryPanel();
  }
}

// ── RUN ───────────────────────────────────────────────────
btnRun.addEventListener("click", async () => {
  if (!pyodide) return;

  clearOutput();
  clearErrorLine();
  btnRun.disabled = true;
  statusMsg.textContent = "Running…";

  const code = editor.getValue();

  try {
    // Reset captured output buffers before each run
    pyodide.runPython(
      "import sys, io\n" +
      "sys.stdout = io.StringIO()\n" +
      "sys.stderr = io.StringIO()\n"
    );

    // Routed through _run_user_code (see initPyodide()) rather than run
    // directly, so bare input() calls in the student's code can suspend
    // on the in-page modal instead of blocking on window.prompt().
    pyodide.globals.set("_user_code", code);
    await pyodide.runPythonAsync("await _run_user_code(_user_code, globals())");

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

    const rawMessage = err && err.message ? err.message : String(err);
    const errText = stderrText || rawMessage;

    // The traceback for a cancelled input() lands in stderrText (Pyodide
    // prints it there before the JS-side error propagates), not
    // reliably in err.message — check the text actually being shown,
    // not just the raw JS error object.
    if (errText.includes("InputCancelled") || rawMessage.includes("InputCancelled")) {
      // A graceful stop, not a bug — a student clicking Cancel on a loop
      // that keeps demanding input (e.g. a broken condition that can
      // never be satisfied) needs a way out that doesn't require
      // reloading the page and losing their code. No error styling.
      appendOutput("Stopped — input cancelled.\n", "out-info");
      if (currentLessonId && getLessonStatus(currentLessonId) === "not-started") {
        setLessonStatus(currentLessonId, "in-progress");
        renderNav();
      }
      return;
    }

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
  editor.setValue(lesson.starterCode);
  localStorage.removeItem("ide-code-" + currentLessonId);
  clearOutput();
  clearErrorLine();
});

// ── COPY ──────────────────────────────────────────────────
btnCopy.addEventListener("click", () => copyToClipboard(editor.getValue(), btnCopy));

// ── Shared input-modal helpers ─────────────────────────────
// #input-modal is reused for two different requests: a Python input()
// call awaiting an answer, and (only when the browser lacks the native
// Save As dialog) asking for a filename before saving. Each caller sets
// inputResolve/inputCancel itself; submitInput()/cancelInput() just
// forward to whichever is currently set.

function resetInputModal() {
  inputModalTitle.textContent = "Input needed";
  inputModalPrompt.textContent = "Enter input:";
  inputModalField.placeholder = "";
  inputModalField.value = "";
  btnInputSubmit.textContent = "Submit";
  inputModal.classList.remove("is-open");
  inputModal.setAttribute("aria-hidden", "true");
}

/** Called from Python (via the js_request_input bridge) whenever student
 *  code hits input(). Resolves with the typed string once submitted, or
 *  null (never a string) on Cancel — see the Python-side InputCancelled
 *  class in initPyodide(), which turns a null resolution into a graceful
 *  stop rather than feeding an empty string into whatever asked for it. */
function requestPythonInput(promptText) {
  return new Promise(resolve => {
    inputModalTitle.textContent = "Input needed";
    inputModalPrompt.textContent = promptText || "Enter input:";
    inputModalField.placeholder = "Enter your input here";
    inputModalField.value = "";
    btnInputSubmit.textContent = "Submit";
    inputModal.classList.add("is-open");
    inputModal.setAttribute("aria-hidden", "false");
    inputModalField.focus();

    inputResolve = value => {
      resetInputModal();
      resolve(value);
    };
    inputCancel = () => {
      resetInputModal();
      resolve(null);
    };
  });
}

/** Fallback filename prompt used by saveViaDownloadPrompt() when the
 *  browser has no native Save As dialog. Resolves the typed name, or
 *  null if the student cancels (distinct from "" — see submitInput()). */
function promptForFilename(defaultFilename) {
  return new Promise(resolve => {
    inputModalTitle.textContent = "Save Python file";
    inputModalPrompt.textContent = "Enter a file name:";
    inputModalField.placeholder = defaultFilename;
    inputModalField.value = defaultFilename;
    btnInputSubmit.textContent = "Save";
    inputModal.classList.add("is-open");
    inputModal.setAttribute("aria-hidden", "false");
    inputModalField.focus();
    inputModalField.select();

    inputResolve = value => {
      resetInputModal();
      resolve(value === "" ? null : value);
    };
    inputCancel = () => {
      resetInputModal();
      resolve(null);
    };
  });
}

function submitInput() {
  if (!inputResolve) return;
  const value = inputModalField.value || "";
  const resolve = inputResolve;
  inputResolve = null;
  inputCancel = null;
  resolve(value);
}

function cancelInput() {
  if (!inputCancel) {
    resetInputModal();
    return;
  }
  const cancel = inputCancel;
  inputResolve = null;
  inputCancel = null;
  cancel();
}

btnInputSubmit.addEventListener("click", submitInput);
btnInputCancel.addEventListener("click", cancelInput);
inputModalField.addEventListener("keydown", e => {
  if (e.key === "Enter") submitInput();
  else if (e.key === "Escape") cancelInput();
});

// ── LOAD ──────────────────────────────────────────────────
// Accepts both .zip (the normal case — see SAVE below) and .py (an older
// save, or a file shared outside the IDE).
btnLoad.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", async e => {
  const file = e.target.files[0];
  e.target.value = ""; // reset so the same file can be loaded again
  if (!file) return;

  const name = file.name.toLowerCase();
  const isZip = name.endsWith(".zip");
  const isPy = name.endsWith(".py");
  if (!isZip && !isPy) {
    appendOutput("Please select a valid Python (.py) or zipped (.zip) file\n", "out-error");
    return;
  }

  try {
    const loaded = isZip ? await readPythonFromZip(file) : await readPythonFromPlainFile(file);
    if (loaded === null) {
      appendOutput("That zip has no .py file inside it.\n", "out-error");
      return;
    }

    editor.setValue(loaded.content);
    clearErrorLine();
    if (currentLessonId) {
      localStorage.setItem("ide-code-" + currentLessonId, editor.getValue());
      if (getLessonStatus(currentLessonId) === "not-started") {
        setLessonStatus(currentLessonId, "in-progress");
        renderNav();
      }
    }
  } catch (err) {
    console.error("Failed to load file:", err);
    appendOutput("Could not read that file.\n", "out-error");
  }
});

/** Returns { content, label }, or null if the zip has no .py file inside it. */
async function readPythonFromZip(file) {
  const zip = await JSZip.loadAsync(file);
  const pyEntry = Object.values(zip.files).find(f => !f.dir && f.name.toLowerCase().endsWith(".py"));
  if (!pyEntry) return null;
  const content = await pyEntry.async("string");
  return { content, label: `${pyEntry.name} (from ${file.name})` };
}

function readPythonFromPlainFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = ev => resolve({ content: ev.target.result, label: file.name });
    reader.onerror = () => reject(reader.error || new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

// ── SAVE ──────────────────────────────────────────────────
// Saves are zipped client-side (via JSZip) instead of downloaded as a raw
// .py — school networks (DoE-managed Chrome/Edge) block .py downloads
// outright at the browser/proxy layer; .zip is not blocked. Where
// supported (Chrome/Edge), the browser's own native Save-As dialog is
// used for real filename + folder picking; elsewhere (or if that dialog
// fails) this falls back to the promptForFilename() modal + a plain
// browser download. Same approach as LoFiPy's proven save/load.
btnSave.addEventListener("click", async () => {
  const code = editor.getValue();
  if (!code.trim()) {
    appendOutput("No code to save\n", "out-error");
    return;
  }

  const defaultFilename = generateDefaultFilename();
  const savedAs = window.showSaveFilePicker
    ? await saveViaFilePicker(code, defaultFilename)
    : await saveViaDownloadPrompt(code, defaultFilename);

  if (savedAs) {
    saveSerial++;
    appendOutput(`Saved as: ${savedAs} (zipped — school networks block raw .py downloads)\n`, "out-info");
  }
});

/** Chrome/Edge native Save As dialog. Returns the saved filename, or null if the student cancelled. */
async function saveViaFilePicker(code, defaultFilename) {
  let handle;
  try {
    handle = await window.showSaveFilePicker({
      suggestedName: defaultFilename.replace(/\.py$/i, ".zip"),
      types: [{ description: "Zip archive", accept: { "application/zip": [".zip"] } }],
    });
  } catch (err) {
    if (err && err.name === "AbortError") {
      appendOutput("Save cancelled.\n", "out-info");
      return null;
    }
    console.error("showSaveFilePicker failed, falling back to the download prompt:", err);
    return saveViaDownloadPrompt(code, defaultFilename);
  }

  const pyName = normalizePythonFilename(handle.name.replace(/\.zip$/i, ""), defaultFilename);
  const blob = await zipPythonFile(pyName, code);
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
  return handle.name;
}

/** Browsers without the File System Access API: prompt for a name, then trigger a normal browser download. */
async function saveViaDownloadPrompt(code, defaultFilename) {
  const requestedFilename = await promptForFilename(defaultFilename);
  if (requestedFilename === null) {
    appendOutput("Save cancelled.\n", "out-info");
    return null;
  }

  const pyName = normalizePythonFilename(requestedFilename, defaultFilename);
  const zipName = pyName.replace(/\.py$/i, ".zip");
  const blob = await zipPythonFile(pyName, code);

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return zipName;
}

async function zipPythonFile(pyName, code) {
  const zip = new JSZip();
  zip.file(pyName, code);
  return zip.generateAsync({ type: "blob" });
}

function generateDefaultFilename() {
  const base = currentLessonId || "code";
  const serial = String(saveSerial).padStart(2, "0");
  return `${base}-${serial}.py`;
}

function normalizePythonFilename(input, fallbackFilename) {
  const trimmed = (input || "").trim();
  const safeBase = trimmed || fallbackFilename;
  const sanitized = safeBase.replace(/[\\/:*?"<>|]/g, "-");
  return sanitized.toLowerCase().endsWith(".py") ? sanitized : `${sanitized}.py`;
}

// ── Theory panel controls ────────────────────────────────
if (btnTheory) {
  btnTheory.addEventListener("click", toggleTheoryPanel);
}

if (btnTheoryClose) {
  btnTheoryClose.addEventListener("click", closeTheoryPanel);
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && theoryPanel && theoryPanel.classList.contains("is-open")) {
    closeTheoryPanel();
  }
});

window.addEventListener("resize", () => {
  if (theoryPanel && theoryPanel.classList.contains("is-open")) {
    positionTheoryPanel();
  }
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

    // Bridge: Python calls this and awaits the JS Promise it returns,
    // which resolves once the student submits/cancels #input-modal.
    pyodide.globals.set("js_request_input", promptText => requestPythonInput(promptText));

    // Real in-page input() support, replacing the native, synchronous
    // window.prompt() (which is the actual cause of crashes/hangs on
    // DoE-managed browsers — a blocking call Pyodide doesn't handle
    // cleanly). input() calls in submitted code are rewritten to
    // `await input(...)` (see _run_user_code, used by the RUN handler
    // above) so they can suspend on the JS-side modal instead. Ported
    // from LoFiPy's proven python-ide-pyodide.js.
    pyodide.runPython(`
import ast
import builtins
# js_request_input is bound directly into this namespace via
# pyodide.globals.set() above — no "from js import" needed for it.

class InputCancelled(Exception):
    """Raised when a student clicks Cancel on an input() prompt — the JS
    side resolves with None specifically to signal this (a plain empty
    string is a legitimate answer, not a cancellation)."""
    pass

async def _input(prompt=""):
    result = await js_request_input(str(prompt))
    if result is None:
        raise InputCancelled()
    return str(result)

# Replace the built-in input function
builtins.input = _input

class _InputAwaiter(ast.NodeTransformer):
    """Rewrites bare input(...) calls into awaited calls so a script that
    reads naturally as normal Python can still suspend on the in-page
    modal without every student needing to write async/await themselves."""
    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, ast.Name) and node.func.id == 'input':
            return ast.copy_location(ast.Await(value=node), node)
        return node

async def _run_user_code(source, ns):
    tree = ast.parse(source, mode='exec')
    tree = _InputAwaiter().visit(tree)
    ast.fix_missing_locations(tree)
    code_obj = compile(tree, '<exec>', 'exec', flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    coro = eval(code_obj, ns, ns)
    if coro is not None:
        await coro
    `);

    statusMsg.textContent = "Ready";
    btnRun.disabled = false;
  } catch (err) {
    statusMsg.textContent = "Failed to load Python runtime.";
    console.error("Pyodide load error:", err);
  }
}

// ── Output panel resize ──────────────────────────────────
// Drag #row-resize-handle up/down to resize the output panel, same idea
// as LoFiPy's split-pane drag (no ember-spark animation here — just the
// resize). Height is stored as the --output-height CSS custom property
// (see #ide-app's grid-template-rows in ide.css) and remembered across
// visits via localStorage; double-click resets to the CSS default (32vh).
const OUTPUT_HEIGHT_STORAGE_KEY = "pyadv-output-height";
const OUTPUT_MIN_PX = 120;

function applyOutputHeight(px) {
  ideApp.style.setProperty("--output-height", `${px}px`);
  // CodeMirror doesn't auto-detect a container resize driven by a CSS
  // custom property change — same "refresh after layout changes" need
  // LoFiPy's own resize/fullscreen handlers already have.
  if (editor) editor.refresh();
}

function resetOutputHeight() {
  ideApp.style.removeProperty("--output-height");
  localStorage.removeItem(OUTPUT_HEIGHT_STORAGE_KEY);
  if (editor) editor.refresh();
}

function initResize() {
  if (!rowResizeHandle || !ideApp) return;

  const stored = parseFloat(localStorage.getItem(OUTPUT_HEIGHT_STORAGE_KEY));
  if (Number.isFinite(stored)) applyOutputHeight(stored);

  let dragging = false;
  let startY = 0;
  let startHeight = 0;

  rowResizeHandle.addEventListener("pointerdown", (e) => {
    dragging = true;
    startY = e.clientY;
    startHeight = document.getElementById("row-output").getBoundingClientRect().height;
    rowResizeHandle.classList.add("is-dragging");
    rowResizeHandle.setPointerCapture(e.pointerId);
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  });

  rowResizeHandle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    // Dragging the handle up (clientY decreases) grows the output panel
    // below it; dragging down shrinks it.
    const maxPx = ideApp.getBoundingClientRect().height * 0.8;
    const newHeight = Math.max(OUTPUT_MIN_PX, Math.min(maxPx, startHeight + (startY - e.clientY)));
    applyOutputHeight(newHeight);
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    rowResizeHandle.classList.remove("is-dragging");
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    const heightPx = parseFloat(getComputedStyle(ideApp).getPropertyValue("--output-height")) ||
      document.getElementById("row-output").getBoundingClientRect().height;
    localStorage.setItem(OUTPUT_HEIGHT_STORAGE_KEY, String(heightPx));
  };
  rowResizeHandle.addEventListener("pointerup", endDrag);
  rowResizeHandle.addEventListener("pointercancel", endDrag);

  rowResizeHandle.addEventListener("dblclick", resetOutputHeight);
}

// ── Entry point ───────────────────────────────────────────
(function init() {
  initializeEditor();

  // Theme itself was already picked before paint by the inline script in
  // _index.html's <head> (avoids a flash of the wrong Bootswatch theme);
  // this syncs the toggle button's label/title and CodeMirror's own
  // theme (monokai/eclipse) to match.
  applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

  if (LESSONS.length > 0) {
    selectLesson(getRequestedLessonId() || LESSONS[0].id);
  }
  initResize();
  initPyodide();
}());
