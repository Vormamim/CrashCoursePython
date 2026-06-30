# Interactive IDE – Development Roadmap

This document captures the post-MVP work planned for the browser-based Python IDE
added in PR-1.

---

## PR-1 (Merged) – Core Interactive IDE (MVP)

**What shipped:**

- `interactive/index.html` – self-contained Bootstrap 5 Darkly-themed IDE page
- `interactive/ide.css` – viewport-filling 3-row grid layout
- `interactive/ide.js` – Pyodide runtime, IDE actions, lesson nav, progress persistence
- `interactive/lessons.js` – all 10 lesson definitions with starter code
- Sidebar and home-page entry point: **▶ Interactive IDE**

**Features:**
- Pyodide in-browser Python runtime (no server required)
- RUN, RESET, COPY, LOAD, SAVE editor actions
- Course progression navigation with `not-started / in-progress / complete` status
- Per-lesson code and status persistence via `localStorage`
- `input()` redirected to browser `prompt()` for interactive lessons
- Ctrl/Cmd + Enter keyboard shortcut to run code

---

## PR-2 – Safety & Execution Control

**Goal:** Prevent runaway code from freezing the browser tab.

- Run user code inside a **Web Worker** (off the main thread)
- Add a configurable **execution timeout** (default: 10 s)
- Show a **"Running… / Cancel"** button while code executes
- Interrupt/terminate the worker on timeout or user cancel
- Display a clear timeout message in the output panel

---

## PR-3 – Editor Upgrade (CodeMirror)

**Goal:** Replace the plain `<textarea>` with a proper code editor.

- Integrate **CodeMirror 6** (lightweight, tree-shaken)
- Python **syntax highlighting** and matching bracket colours
- **Line numbers** gutter
- Keyboard shortcuts (Ctrl/Cmd+Enter to run, Tab for indent)
- Optional: highlight the line containing a runtime error

---

## PR-4 – Learning Progression Features

**Goal:** Give students actionable feedback when they complete a lesson task.

- Per-lesson **check functions** in `lessons.js` (e.g. assert stdout contains expected text)
- Auto-mark lesson **complete** when checks pass (rather than on any clean run)
- Lightweight **badge / progress bar** in the nav row
- Persist attempt history (count of runs, first-pass timestamp) locally

---

## PR-5 – Shareability & Portability

**Goal:** Make it easy to share code snippets and back up progress.

- **Share link** – encode editor contents as a URL query parameter (gzip + base64)
- **Export progress** – download `progress.json` with all lesson statuses and saved code
- **Import progress** – load a previously exported `progress.json`
- Optional: autosave snapshots per lesson (last 3 versions)

---

## PR-6 – Course Content Alignment & Refactor

**Goal:** Tightly couple the IDE to the written course materials.

- Map all existing chapter worksheets/tutorials to `lessons.js` entries
- Standardise starter templates and expected output strings
- Ensure lesson order in the IDE nav mirrors the course flow exactly
- Add lesson descriptions / hints visible in the IDE (collapsible panel)
- Review and refresh starter code for any lessons added after the MVP

---

## Architecture Overview

```
course-pack/student-pack/
├── interactive/
│   ├── index.html    # self-contained IDE page (no Jekyll layout)
│   ├── ide.css       # 3-row CSS-grid layout + terminal styling
│   ├── ide.js        # runtime glue: Pyodide, buttons, nav, persistence
│   └── lessons.js    # LESSONS array – add new lessons here
├── _layouts/
│   └── default.html  # site layout – "▶ Interactive IDE" link in sidebar
└── index.md          # home page – "▶ Interactive IDE" entry point
```

### Adding a New Lesson

1. Open `interactive/lessons.js`.
2. Append an object to the `LESSONS` array:

```js
{
  id: "lesson-11",           // unique slug, used for localStorage keys and filename on save
  title: "11 · Your Title",  // shown in the nav button
  starterCode: `# starter code here\n`
}
```

3. (Optional) Add a corresponding worksheet/tutorial under the matching lesson folder.

That's it — the IDE picks up the new lesson automatically on next page load.
